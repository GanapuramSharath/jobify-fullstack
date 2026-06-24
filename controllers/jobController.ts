import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";
import { prisma } from "../utils/prisma";
import moment from "moment";

import { NotFoundError } from "../errors/customError";

interface JobQuery {
  search?: string;
  jobStatus?: string;
  jobType?: string;
  sort?: string;
}

export const getAllJobs = async (
  req: Request<{}, {}, {}, JobQuery>,
  res: Response,
): Promise<void> => {
  const { search, jobStatus, jobType, sort } = req.query;

  const where: any = {
    createdById: req.user.userId,
  };

  if (search) {
    where.position = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (jobStatus && jobStatus !== "all") {
    where.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    where.jobType = jobType;
  }

  let orderBy: any = {
    createdAt: "desc",
  };

  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;

    case "a-z":
      orderBy = { position: "asc" };
      break;

    case "z-a":
      orderBy = { position: "desc" };
      break;
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy,
  });

  res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const job = await prisma.job.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!job) {
    throw new NotFoundError(`no job with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};
export const createJob = async (req: Request, res: Response): Promise<void> => {
  const job = await prisma.job.create({
    data: {
      company: req.body.company,
      position: req.body.position,
      jobStatus: req.body.jobStatus,
      jobType: req.body.jobType,
      jobLocation: req.body.jobLocation,
      createdById: req.user.userId,
    },
  });

  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const job = await prisma.job.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.status(StatusCodes.OK).json({
    msg: "job updated",
    job,
  });
};

export const deleteJob = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const job = await prisma.job.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(StatusCodes.OK).json({
    msg: "job deleted",
    job,
  });
};

export const showStats = async (req: Request, res: Response): Promise<void> => {
  const stats = await prisma.job.groupBy({
    by: ["jobStatus"],
    where: {
      createdById: req.user.userId,
    },
    _count: {
      id: true,
    },
  });

  const defaultStats = {
    pending: 0,
    interview: 0,
    declined: 0,
  };

  stats.forEach((item) => {
    defaultStats[item.jobStatus] = item._count.id;
  });

  const monthlyApplications = await prisma.$queryRawUnsafe(`
      SELECT
        DATE_TRUNC('month', "createdAt") AS month,
        COUNT(*)::int AS count
      FROM "Job"
      WHERE "createdById" = '${req.user.userId}'
      GROUP BY month
      ORDER BY month DESC
      LIMIT 6
    `);

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications,
  });
};

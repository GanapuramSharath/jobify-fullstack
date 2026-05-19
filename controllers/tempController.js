import Job from "../models/JobModel.js";
import { NotFoundError } from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";
import mongoose from "mongoose";
import moment from "moment";

// ================= GET ALL JOBS =================

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // SEARCH BY POSITION
  if (search && search !== "") {
    queryObject.position = {
      $regex: search,
      $options: "i",
    };
  }

  // FILTER BY STATUS
  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  // FILTER BY TYPE
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  let result = Job.find(queryObject);

  // SORTING
  if (sort === "newest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("position");
  }

  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const jobs = await result;

  res.status(StatusCodes.OK).json({ jobs });
};

// ================= GET SINGLE JOB =================

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new NotFoundError(`no job with id ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

// ================= CREATE JOB =================

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

// ================= UPDATE JOB =================

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({
    msg: "job updated",
    job: updatedJob,
  });
};

// ================= DELETE JOB =================

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({
    msg: "job deleted",
    job: removedJob,
  });
};

// ================= SHOW STATS =================

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$jobStatus",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;

    acc[title] = count;

    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $limit: 6,
    },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM DD YYYY");

      return {
        date,
        count,
      };
    })
    .reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications,
  });
};

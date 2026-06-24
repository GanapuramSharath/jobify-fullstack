import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { prisma } from "../utils/prisma";
import cloudinary from "../utils/cloudinary";

export const getCurrentUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.userId,
    },
  });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      msg: "User not found",
    });
    return;
  }

  const { password, ...safeUser } = user;

  res.status(StatusCodes.OK).json({
    user: safeUser,
  });
};

export const getApplicationStats = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const users = await prisma.user.count();
  const jobs = await prisma.job.count();

  res.status(StatusCodes.OK).json({
    users,
    jobs,
  });
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const obj: any = { ...req.body };

delete obj.password;

if (req.file) {
  obj.avatar = req.file.path;
}

const updatedUser = await prisma.user.update({
  where: {
    id: req.user.userId,
  },
  data: obj,
});

const { password, ...safeUser } = updatedUser;

res.status(StatusCodes.OK).json({
  msg: "user updated",
  user: safeUser,
});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

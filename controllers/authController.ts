import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import "express-async-errors";

import { prisma } from "../utils/prisma";
import { comparePassword, hashPassword } from "../utils/passwordsUtils";
import { UnauthenticatedError } from "../errors/customError";
import { createJWT } from "../utils/tokenUtils";

interface AuthBody {
  name?: string;
  email: string;
  password: string;
  
}

export const register = async (
  req: Request<{}, {}, AuthBody>,
  res: Response,
): Promise<void> => {
  const usersCount = await prisma.user.count();

  const role = usersCount === 0 ? "ADMIN" : "USER";

  const hashedPassword = await hashPassword(req.body.password);

  await prisma.user.create({
    data: {
      name: req.body.name!,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      role,
    },
  });

  res.status(StatusCodes.CREATED).json({
    msg: "user created",
  });
};
export const login = async (
  req: Request<{}, {}, AuthBody>,
  res: Response,
): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email.toLowerCase(),
    },
  });

  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const isValidPassword = await comparePassword(
    req.body.password,
    user.password,
  );

  if (!isValidPassword) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const token = createJWT({
    userId: user.id,
    role: user.role,
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({
    msg: "user logged in",
  });
};

export const logout = (_req: Request, res: Response): void => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(),
  });

  res.status(StatusCodes.OK).json({
    msg: "user logged out!",
  });
};

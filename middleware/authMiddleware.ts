import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors/customError";
import { verifyJWT } from "../utils/tokenUtils";
import { UserRole } from "../utils/constants";

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    const { userId, role } = verifyJWT(token);

    req.user = {
      userId,
      role,
    };

    next();
  } catch {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export const authorizePermissions =
  (...roles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("You are not authorized to view this page");
    }

    next();
  };

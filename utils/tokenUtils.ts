import jwt from "jsonwebtoken";
import { UserRole } from "./constants";

interface JwtPayload {
  userId: string;
  role: UserRole;
}

export const createJWT = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const verifyJWT = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
};

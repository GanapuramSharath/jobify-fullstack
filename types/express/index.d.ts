import { UserRole } from "../../utils/constants";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: UserRole;
      };
    }
  }
}

export {};

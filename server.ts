import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";
import cors from "cors";
import path from "path";
import { prisma } from "./utils/prisma";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import jobRouter from "./routes/jobRouter";

import { authenticateUser } from "./middleware/authMiddleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "dist")));
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API Routes

app.get("/api/v1/test", (_req: Request, res: Response) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

// React App

app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error Handler

app.use(errorHandlerMiddleware);

// Server

const PORT = Number(process.env.PORT) || 10000;

const start = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}...`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }

process.exit(1);
  }
};

start();


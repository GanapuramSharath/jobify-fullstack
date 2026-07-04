import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";
import cors from "cors";
import path from "path";

import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import jobRouter from "./routes/jobRouter";

import { authenticateUser } from "./middleware/authMiddleware";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware";

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// API routes

app.get("/api/v1/test", (_req: Request, res: Response) => {
  res.json({
    msg: "test route",
  });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

// React frontend

app.use(express.static(path.join(process.cwd(), "client", "dist")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "client", "dist", "index.html"));
});

// errors

app.use(errorHandlerMiddleware);

export default app;

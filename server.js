import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "express-async-errors";

import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";

import { authenticateUser } from "./MiddleWare/authMiddleWare.js";
import ErrorHandlermiddleware from "./MiddleWare/ErrorHandlermiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());



if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

// ================= API ROUTES =================

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/auth", authRouter);

// ================= STATIC FILES =================



app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// ================= ERROR HANDLER =================

app.use(ErrorHandlermiddleware);

// ================= SERVER =================

const PORT = process.env.PORT || 5200;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected...");

    app.listen(PORT, () => {
      console.log(`server running on PORT ${PORT}...`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

start();

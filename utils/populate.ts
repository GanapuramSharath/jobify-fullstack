import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Job from "../models/JobModel";
import User from "../models/UserModel";

dotenv.config();

const populate = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);

    const user = await User.findOne({
      email: "sharath@gmail.com",
    });

    if (!user) {
      throw new Error("User not found");
    }

    const jsonJobs = JSON.parse(
      await readFile("./utils/mockData.json", "utf-8"),
    ) as Record<string, unknown>[];

    const jobs = jsonJobs.map((job) => ({
      ...job,
      createdBy: user._id,
    }));

    await Job.deleteMany({
      createdBy: user._id,
    });

    await Job.create(jobs);

    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

populate();

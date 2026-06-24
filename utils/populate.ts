import { readFile } from "fs/promises";
import dotenv from "dotenv";
import { prisma } from "./prisma";

dotenv.config();

const populate = async (): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: "sharath@gmail.com",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const jsonJobs = JSON.parse(
      await readFile("./utils/mockData.json", "utf-8"),
    );

    await prisma.job.deleteMany({
      where: {
        createdById: user.id,
      },
    });

    await prisma.job.createMany({
      data: jsonJobs.map((job: any) => ({
        company: job.company,
        position: job.position,
        jobStatus: job.jobStatus,
        jobType: job.jobType,
        jobLocation: job.jobLocation,
        createdById: user.id,
      })),
    });

    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

populate();

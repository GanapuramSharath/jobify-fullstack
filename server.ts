import app from "./app";

import { prisma } from "./utils/prisma";

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

// shutdown prisma cleanly

process.on("SIGINT", async () => {
  await prisma.$disconnect();

  process.exit(0);
});

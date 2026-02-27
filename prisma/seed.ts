import { PrismaClient } from "@prisma/client";

import { seedVideos } from "./seeds/videos.seeds";
import { seedProblems } from "./seeds/problems.seed";
import { seedUsers } from "./seeds/users.seed";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ORDER MATTERS if relations exist
  await seedUsers(prisma);
  await seedProblems(prisma);
  await seedVideos(prisma);

  console.log("✅ Seeding finished");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

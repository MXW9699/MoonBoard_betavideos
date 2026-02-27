/**
 * Insert the Dynamitch user (run first).
 * Run from project root: node scripts/insert-user.js
 */
require("dotenv").config();
const prisma = require("../model/prisma");
const { problems } = require("../dummydata.ts");

async function main() {
  const result = await prisma.problem.createMany({
    data: problems,
    skipDuplicates: true,
  });
  console.log("Problems: inserted", result.count);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Insert failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

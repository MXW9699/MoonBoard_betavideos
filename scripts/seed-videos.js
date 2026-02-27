/**
 * Seed the videos table from dummydata.ts.
 * Requires: user Dynamitch and problems already seeded (run insert-user.js and seed-problems.js first).
 * Resolves problemId by problemName, board, and fontGrade. Run from project root: node scripts/seed-videos.js
 */
require("dotenv").config();
const prisma = require("../model/prisma.js");
const { videos } = require("../dummydata.ts");

async function main() {
  const user = await prisma.users.findFirst({
    where: { username: "Dynamitch" },
  });
  if (!user)
    throw new Error('User "Dynamitch" not found. Run insert-user.js first.');

  const problems = await prisma.problem.findMany();
  const keyToId = new Map();
  for (const p of problems) {
    const key = `${p.name}|${p.fontGrade ?? ""}|${p.board ?? ""}`;
    keyToId.set(key, p.id);
  }

  const data = [];
  for (const v of videos) {
    const key = `${v.problemName}|${v.fontGrade ?? ""}|${v.board ?? ""}`;
    const problemId = keyToId.get(key);
    if (problemId == null) continue;
    data.push({
      uploaded_by: user.id,
      problemId,
      link: v.link ?? v.video,
      video: v.video ?? v.link,
    });
  }

  const result = await prisma.videos.createMany({ data, skipDuplicates: true });
  console.log("Videos: inserted", result.count);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Insert failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

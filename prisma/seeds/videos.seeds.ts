import type { PrismaClient } from "@prisma/client";
import { videos } from "../../dummydata";

export async function seedVideos(prisma: PrismaClient) {
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

  const data: {
    uploaded_by: number;
    problemId: number;
    link: string;
    video: string;
  }[] = [];
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

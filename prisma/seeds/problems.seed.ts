import type { PrismaClient } from "@prisma/client";
import { problems } from "../../dummydata";

export async function seedProblems(prisma: PrismaClient) {
  const result = await prisma.problem.createMany({
    data: problems,
    skipDuplicates: true,
  });
  console.log("Problems inserted:", result.count);
}

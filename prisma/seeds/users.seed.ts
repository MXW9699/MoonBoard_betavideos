import type { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const user = await prisma.users.create({
    data: { username: "Dynamitch", firstName: "Mitch", lastName: "Wen" },
  });
  console.log("User:", user.username, "(id:", user.id, ")");
}

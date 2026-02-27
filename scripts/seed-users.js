/**
 * Insert the Dynamitch user (run first).
 * Run from project root: node scripts/insert-user.js
 */
require("dotenv").config();
const prisma = require("../model/prisma");

async function main() {
  const user = await prisma.users.create({
    data: { username: "Dynamitch", firstName: "Mitch", lastName: "Wen" },
  });
  console.log("User:", user.username, "(id:", user.id, ")");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Insert failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

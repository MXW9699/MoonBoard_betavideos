import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/** Singleton Prisma client (avoids multiple instances in dev with hot reload). */
const prisma =
  globalThis.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Avoid multiple instances in development (Next.js hot reload etc)
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;

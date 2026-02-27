const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis;

/** Singleton Prisma client (avoids multiple instances in dev with hot reload). */
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

module.exports = prisma;

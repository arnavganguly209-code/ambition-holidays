import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client for Next.js (dev HMR + serverless/PM2).
 * Does not connect until a query runs. Safe when DATABASE_URL is unset
 * as long as no DB code path executes (current Orbit still uses JSON).
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

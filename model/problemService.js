import prisma from "@model/prisma.ts";
import {
  validateProblemCreate,
  validateProblemUpdate,
} from "@model/schemas/problemSchema.ts";

/**
 * Problem service using Prisma + Zod.
 * Use these from controllers when working with the problems table.
 */

async function createProblem(input) {
  const data = validateProblemCreate(input);
  return prisma.problem.create({ data });
}

async function updateProblem(id, input) {
  const data = validateProblemUpdate(input);
  return prisma.problem.update({ where: { id: Number(id) }, data });
}

async function findProblemById(id) {
  return prisma.problem.findUnique({ where: { id: Number(id) } });
}

async function findProblems(where = {}) {
  return prisma.problem.findMany({
    where,
    orderBy: { name: "asc" },
  });
}

async function findProblemsByNameSearch(search = "") {
  return prisma.problem.findMany({
    where: search
      ? { name: { contains: search, mode: "insensitive" } }
      : undefined,
    orderBy: { name: "asc" },
  });
}

/**
 * Find problems with pagination and field selection.
 * @param {Object} options
 * @param {number} [options.take=100] - Max records to return
 * @param {number} [options.skip=0] - Records to skip (offset)
 * @param {Object} [options.select] - Which fields to return (Prisma select); omit for all fields
 * @param {Object} [options.where] - Optional Prisma where filter
 */
async function findProblemsWithOptions(options = {}) {
  const { take = 100, skip = 0, select, where } = options;
  return prisma.problem.findMany({
    take: Math.min(Math.max(0, take), 500),
    skip: Math.max(0, skip),
    ...(select && { select }),
    ...(where && { where }),
    orderBy: { name: "asc" },
  });
}

async function deleteProblem(id) {
  return prisma.problem.delete({ where: { id: Number(id) } });
}

module.exports = {
  createProblem,
  updateProblem,
  findProblemById,
  findProblems,
  findProblemsByNameSearch,
  findProblemsWithOptions,
  deleteProblem,
};

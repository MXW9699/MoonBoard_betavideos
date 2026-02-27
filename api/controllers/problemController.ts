import prisma from "../../model/prisma";
import { Request, Response, NextFunction } from "express";

const holdset = [];

//get problems
export const getList = (req: Request, res: Response, next: NextFunction) => {
  const search = req.params.id ?? "";

  prisma.problem
    .findMany({
      where: { name: { contains: search, mode: "insensitive" } },
      orderBy: { name: "asc" },
    })
    .then((data) => {
      res.locals.problemsList = data;
      return next();
    })
    .catch(() => {
      return next({ log: "error at getting problems list" });
    });
};

//get holds
// updateHolds: async (req, res, next) => {
//   for (let i = 0; i < holdset.length; i++) {
//     await prisma.problem.update({
//       where: { id: i + 214 },
//       data: { holds: holdset[i] },
//     });
//   }
//   return next();

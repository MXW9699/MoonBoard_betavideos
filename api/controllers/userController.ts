import prisma from "@model/prisma";
import { Request, Response, NextFunction } from "express";

const verifiedUsers = {
  Mitch: "Wen",
  Hello: "World",
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  //deconstruct the username and password from the request body
  const { username, password } = req.body;
  if (verifiedUsers[username as keyof typeof verifiedUsers]) {
    if (verifiedUsers[username as keyof typeof verifiedUsers] === password)
      return next();
  } else {
    return next({
      log: "verifyUser error",
      status: 400,
      message: { err: "you are not real" },
    });
  }
};

export const addUser = (req: Request, res: Response, next: NextFunction) => {
  prisma.users
    .create({
      data: { username: "tryna", firstName: "hello", lastName: "world" },
    })
    .then((data) => {
      console.log("data:", data);
      return next();
    })
    .catch(() => {
      return next({ log: "error adding" });
    });
};

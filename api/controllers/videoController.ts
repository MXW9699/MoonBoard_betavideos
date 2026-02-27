// import { getVideoSource } from "../../Serverless/scraper";
import { NextFunction, Request, Response } from "express";
import prisma from "../../model/prisma";

//get problems
export const getVideosByName = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("getting videos", req.params.id);
  prisma.videos
    .findMany({
      where: { problem: { name: req.params.id } },
    })
    .then((data) => {
      res.locals.videos = data;
      return next();
    })
    .catch(() => {
      return next({ log: "error in getting videos" });
    });
};

export const getVideosByUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("getting videos of user", req.params.id);
  prisma.videos
    .findMany({
      where: { uploaded_user: { username: req.params.id } },
    })
    .then((data) => {
      res.locals.videos = data;
      return next();
    })
    .catch(() => {
      return next({ log: "error in getting videos" });
    });
};

// export const updateVideo = async (req, res, next) => {
//   const { username, link, problemName } = req.body;
//   if (!(username && link && problemName)) {
//     return next({ message: { err: "empty fields" } });
//   }
//   console.log(link);
//   const modifiedLink =
//     link.replace("/p/", "/reel/") + (link.slice(-6) != "/embed" ? "embed" : "");
//   console.log(modifiedLink);
//   const videoSource = await getVideoSource(modifiedLink);

//   console.log("updating");
//   prisma.videos
//     .update({
//       where: { id: req.params.id },
//       data: {
//         link: modifiedLink,
//         video: videoSource.video,
//         img: videoSource.img,
//       },
//     })
//     .then(() => {
//       return next();
//     })
//     .catch(() => {
//       return next({ log: "error at updating video" });
//     });
// };

// export const addVideo = async (req, res, next) => {
//   let { username, link, problemName } = req.body;
//   if (username == "DYNA.MITCH") username = "1";
//   if (!(username && link && problemName)) {
//     return next({ message: { err: "empty fields" } });
//   }
//   const modifiedLink =
//     link.replace("/p/", "/reel/") + (link.slice(-6) != "/embed" ? "embed" : "");
//   const videoSource = await getVideoSource(modifiedLink);
//   prisma.videos
//     .create({
//       data: {
//         uploaded_user: { connect: { username: username } },
//         problem: {
//           connect: {
//             name_board: {
//               name: problemName.toUpperCase(),
//               board: "Moonboard_2019",
//             },
//           },
//         },
//         link: modifiedLink,
//         video: videoSource.video,
//         img: videoSource.img,
//       },
//     })
//     .then(() => {
//       return next();
//     })
//     .catch(() => {
//       return next({ log: "error at adding video" });
//     });
// };

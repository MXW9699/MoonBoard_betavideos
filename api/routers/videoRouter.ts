import express from "express";
import {
  getVideosByUser,
  getVideosByName,
  // updateVideo,
  // addVideo,
} from "../controllers/videoController.ts";

//create the router
const router = express.Router();

router.get("/user/:id", getVideosByUser, (req, res) => {
  return res.status(200).json(res.locals.videos);
});

router.get("/:id", getVideosByName, (req, res) => {
  return res.status(200).json(res.locals.videos);
});

// router.post("/update", updateVideo, (req, res) => {
//   return res.sendStatus(200);
// });

// router.post("/add", updateVideo, addVideo, (req, res) => {
//   return res.sendStatus(200);
// });

//exporting the router
export { router };

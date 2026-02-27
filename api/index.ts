// Load env first so DATABASE_URL is set before Prisma/pg are required
import "dotenv/config";

//allows us to process html requests
import express, {
  RequestHandler,
  NextFunction,
  Response,
  Request,
} from "express";
//allows us to read cookies
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

//get all chunks of bodies, cookies, http form and turn them to js readables
app.use(express.json());
app.use(cookieParser() as RequestHandler);
app.use(express.urlencoded());

/*********************CONTROLLER IMPORTS**************************************** */
import { verifyUser, addUser } from "./controllers/userController.ts";

/*********************ROUTER IMPORTS**************************************** */
import { router as videosRouter } from "./routers/videoRouter.ts";
import { router as problemRouter } from "./routers/problemRouter.ts";

//statically serve the build folder which contains the bundle in the production environment
app.use("/build", express.static(path.join(__dirname, "../build")));

/*********************LOAD PAGES**************************************** */
//main page get. send them the html file
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

//get database page
app.get("/data", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

//get database page
app.get("/profile", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

/*********************ACTIONS**************************************** */
//handle login request
app.post("/login", verifyUser, addUser, (req, res) => {
  return res.redirect("/data");
});

//handle everything in the router
//get problem lists
app.use("/problemList", problemRouter);
app.use("/video", videosRouter);

/*********************ERROR HANDLERS**************************************** */
// //404 ERROR HANDLER
app.use("*", (req, res) => {
  return res.status(404).send("WHERE ARE YOU GOING?!?!?!");
});

//global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: "some unknow error occured in application",
    status: 500,
    message: { err: "unknown error occured" },
  };
  const errorObj = Object.assign(defaultErr, err);
  //internal use log to see where error occured
  console.log(errorObj.log);
  //send status back to client with error message
  return res.status(errorObj.status as number).json(errorObj.message);
});

//start up server on PORT
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

export default app;

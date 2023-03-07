import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Express, json, Request, Response } from "express";
import { CLIENT_URL, IS_DEV, PORT } from "./contants";
import errorHandler from "./util/errorHandler";
import cors from "cors";

const app: Express = express();

// Basic middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(json());
app.use(
  cors({
    origin: [CLIENT_URL],
  })
);

app.use(morgan(IS_DEV ? "dev" : "common"));

app.get("/", (req: Request, res: Response): void => {
  res.send({ msg: `server is running`, CLIENT_URL, PORT });
});

app.use(errorHandler);

const staticDir: string = path.join(__dirname, "public");
app.use(express.static(staticDir));

export default app;

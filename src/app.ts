import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Express, json } from "express";
import { CLIENT_URL, IS_DEV } from "./contants";
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

app.get("/", (): void => {
  throw new Error("LOL");
});

app.use(errorHandler);

const staticDir: string = path.join(__dirname, "public");
app.use(express.static(staticDir));

export default app;

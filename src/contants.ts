import { config } from "dotenv";

/* eslint-disable node/no-process-env */
config();

export const PORT: string | number = process.env.PORT || 8080;
export const IS_DEV: boolean = process.env.NODE_ENV !== "production";
export const CLIENT_URL: string =
  process.env.CLIENT_URL || "http://localhost:5173";

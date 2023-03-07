import { PORT } from "./contants";
import app from "./app";
import logger from "./util/logger";
import { createServer, Server as HTTPServer } from "http";
import initializeSocket from "./socket";
import { config } from "dotenv";

config();

const server: HTTPServer = createServer(app);
initializeSocket(server);

server.listen(PORT, (): void => {
  logger.info(`server running on port ${PORT}`);
});

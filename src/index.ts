import { PORT } from "./contants";
import app from "./app";
import logger from "./util/logger";
import { createServer, Server as HTTPServer } from "http";
import initializeSocket from "./socket";
import { config } from "dotenv";

config();

const server: HTTPServer = createServer(app);
initializeSocket(server);

if (require.main === module) {
  // Start the server only if this file is being run directly
  server.listen(PORT, (): void => {
    logger.info(`server running on port ${PORT}`);
  });
}

export default server;

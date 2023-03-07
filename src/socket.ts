import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import logger from "./util/logger";

const initializeSocket: (server: HTTPServer) => void = (
  server: HTTPServer
): void => {
  logger.info("Initializing Socket server");
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  io.on("connection", (socket: Socket): void => {
    logger.info(`++ ${socket.id} ${Array.from(io.sockets.sockets).length}`);

    socket.emit("connection");

    socket.on("gather", (denId: string): void => {
      logger.info(`${socket.id} gathered in ${denId}`);
      socket.join(denId);
      socket.to(denId).emit("gathered", socket.id);
      socket.on("offer", (offer: RTCSessionDescriptionInit): void => {
        socket.to(denId).emit("offer", offer);
      });
      socket.on("answer", (answer: RTCSessionDescriptionInit): void => {
        socket.to(denId).emit("answer", answer);
      });
      socket.on("candidate", (candidate: RTCIceCandidateInit): void => {
        socket.to(denId).emit("candidate", candidate);
      });
    });

    socket.on("disconnect", (): void => {
      logger.info(`-- ${socket.id} ${Array.from(io.sockets.sockets).length}`);
    });
  });
};

export default initializeSocket;

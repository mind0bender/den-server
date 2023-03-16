import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import { CLIENT_URL } from "./contants";
import logger from "./util/logger";

interface DenRoom {
  kingId: string;
  memberIds: Set<string>;
}

export const denRooms: Map<string, DenRoom> = new Map();

const initializeSocket: (server: HTTPServer) => void = (
  server: HTTPServer
): void => {
  logger.info("Initializing Socket server");
  const io = new Server(server, {
    cors: {
      origin: [CLIENT_URL],
    },
  });

  io.on("connection", (socket: Socket): void => {
    logger.info(`++ ${socket.id} ${Array.from(io.sockets.sockets).length}`);

    socket.emit("connection");

    socket.on("gather", (denId: string): void => {
      let denRoom: DenRoom | undefined = denRooms.get(denId);
      if (!denRoom || !denRoom.memberIds.size) {
        // build the den for first joining;
        denRoom = {
          kingId: socket.id,
          memberIds: new Set<string>(),
        };
        denRooms.set(denId, denRoom);
      }
      denRoom?.memberIds.add(socket.id);

      logger.info(`${socket.id} gathered in ${denId}`);
      socket.join(denId);
      io.to(denId).emit("members", Array.from(denRoom?.memberIds));
      socket.on("offer", (offer: RTCSessionDescriptionInit): void => {
        socket.to(denId).emit("offer", offer);
      });
      socket.on("answer", (answer: RTCSessionDescriptionInit): void => {
        socket.to(denId).emit("answer", answer);
      });
      socket.on("candidate", (candidate: RTCIceCandidateInit): void => {
        socket.to(denId).emit("candidate", candidate);
      });
      socket.addListener("disconnect", (): void => {
        denRoom?.memberIds.delete(socket.id);
      });
    });
    socket.addListener("disconnect", (): void => {
      logger.info(`-- ${socket.id} ${Array.from(io.sockets.sockets).length}`);
    });
  });
};

export default initializeSocket;

import { Server } from 'http';
import socketio from 'socket.io';

export let socketServer: socketio.Server;

interface ConnectedTotems {
  [totem_id: string]: string;
}

export const connectedTotems: ConnectedTotems = {};

export function connectToSocketServer(server: Server): void {
  socketServer = socketio(server);

  socketServer.on('connection', socket => {
    const { totem_id }: ConnectedTotems = socket.handshake.query;

    connectedTotems[totem_id] = socket.id;

    // eslint-disable-next-line no-console
    console.log(`🖥  socket ${socket.id} connected!`);

    // eslint-disable-next-line no-console
    console.log(connectedTotems);

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log(`🖥  socket ${socket.id} disconnected!`);

      delete connectedTotems[totem_id];

      // eslint-disable-next-line no-console
      console.log(connectedTotems);
    });
  });
}

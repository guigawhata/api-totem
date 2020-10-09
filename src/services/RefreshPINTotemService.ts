import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import socketio from 'socket.io';

import Totem from '../models/Totem';

interface Request {
  socketServer: socketio.Server;
}

class RefreshPINTotemService {
  public async execute({ socketServer }: Request): Promise<void> {
    const totemRepository = getRepository(Totem);

    const totems = await totemRepository.find({
      where: {
        status: 'offline',
      },
    });

    totems.map(async totem => {
      const pin = Math.random().toString(36).substring(7);

      const hashPIN = await hash(pin.toUpperCase(), 8);

      totem.pin = hashPIN;

      await totemRepository.save(totem);

      socketServer.sockets.emit('pin', {
        id: totem.id,
        pin: pin.toUpperCase(),
      });
    });
  }
}

export default RefreshPINTotemService;

import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import Totem from '../models/Totem';

import AppError from '../errors/AppError';

interface Request {
  qr_reader_id: string;
  pin: string;
}

class ActivateTotemService {
  public async execute({ qr_reader_id, pin }: Request): Promise<Totem> {
    const totemRepository = getRepository(Totem);

    const totem = await totemRepository.findOne({
      where: {
        qr_reader_id,
      },
    });

    if (!totem) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const pinMatched = await compare(pin, totem.pin || '');

    if (!pinMatched) {
      throw new AppError('Incorrect pin combination', 401);
    }

    totem.status = 'online';

    await totemRepository.save(totem);

    return totem;
  }
}

export default ActivateTotemService;

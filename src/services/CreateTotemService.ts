import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Totem from '../models/Totem';

interface Request {
  qr_reader_id: string;
  aroma_dispenser_id: string;
}

class CreateTotemService {
  public async execute({
    qr_reader_id,
    aroma_dispenser_id,
  }: Request): Promise<Totem> {
    const totemRepository = getRepository(Totem);

    const pin = '123456';

    const hashPIN = await hash(pin, 8);

    const totem = totemRepository.create({
      status: 'offline',
      pin: hashPIN,
      qr_reader_id,
      aroma_dispenser_id,
    });

    await totemRepository.save(totem);

    return totem;
  }
}

export default CreateTotemService;

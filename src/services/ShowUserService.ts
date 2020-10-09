import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  id: string;
}

class ShowUserService {
  public async execute({ id }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne(id);

    if (!checkUserExists) {
      throw new AppError('Invalid ID!');
    }

    delete checkUserExists.password;

    return checkUserExists;
  }
}

export default ShowUserService;

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  username: string;
  password: string;
}

class StoreUserService {
  public async execute({
    name,
    email,
    username,
    password,
  }: Request): Promise<User> {
    if (!name || !email || !username || !password) {
      throw new AppError('Invalid Form!');
    }

    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: {
        email,
      },
    });

    const hashPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError('Email adress already used!');
    }

    const user = userRepository.create({
      name,
      email,
      username,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default StoreUserService;

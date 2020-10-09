import { Router } from 'express';
import multer from 'multer';

import ListUsersService from '../services/ListUsersService';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ShowUserService from '../services/ShowUserService';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const listUsers = new ListUsersService();

  const users = await listUsers.execute();

  return response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showUser = new ShowUserService();

  const user = await showUser.execute({ id });

  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { name, username, email, password } = request.body;

  const storeUser = new CreateUserService();

  const user = await storeUser.execute({
    name,
    email,
    username,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.body.user_id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;

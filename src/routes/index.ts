import { Router } from 'express';

import usersRouter from './users.routes';
import totemsRouter from './totems.routes';
import cartsRouter from './carts.routes';

import { connectedTotems } from '../utils/sockets';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ totems: connectedTotems });
});

routes.use('/users', usersRouter);
routes.use('/totems', totemsRouter);
routes.use('/carts', cartsRouter);

export default routes;

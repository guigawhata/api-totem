import { Router } from 'express';

import usersRouter from './users.routes';
import totemsRouter from './totems.routes';
import cartsRouter from './carts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/totems', totemsRouter);
routes.use('/carts', cartsRouter);

export default routes;

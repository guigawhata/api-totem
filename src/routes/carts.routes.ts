import { Router } from 'express';

import CreateCartService from '../services/CreateCartService';
import { socketServer, connectedTotems } from '../utils/sockets';

const cartsRouter = Router();

cartsRouter.post('/', async (request, response) => {
  const { id, qr_reader_id } = request.body;

  const createCart = new CreateCartService();

  const cart = await createCart.execute({
    id,
    qr_reader_id,
    socketServer,
    connectedTotems,
  });

  return response.json(cart);
});

export default cartsRouter;

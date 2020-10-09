import { request, response, Router } from 'express';

import CreateTotemService from '../services/CreateTotemService';
import ActivateTotemService from '../services/ActivateTotemService';
import TryAromaTotemService from '../services/TryAromaTotemService';

const totemsRouter = Router();

totemsRouter.post('/', async (request, response) => {
  const { qr_reader_id, aroma_dispenser_id } = request.body;

  const storeUser = new CreateTotemService();

  const totem = await storeUser.execute({ qr_reader_id, aroma_dispenser_id });

  delete totem.pin;

  return response.json(totem);
});

totemsRouter.post('/activate', async (request, response) => {
  const { qr_reader_id, pin } = request.body;

  const storeUser = new ActivateTotemService();

  const totem = await storeUser.execute({ qr_reader_id, pin });

  delete totem.pin;

  return response.json(totem);
});

totemsRouter.post('/try-aroma', async (request, response) => {
  const { client_id, product_id, totem_id } = request.body;

  const tryAromaTotemService = new TryAromaTotemService();

  await tryAromaTotemService.execute({ client_id, product_id, totem_id });
});

export default totemsRouter;

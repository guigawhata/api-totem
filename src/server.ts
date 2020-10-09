import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import 'express-async-errors';

import http from 'http';
import cors from 'cors';
import { connectToSocketServer, socketServer } from './utils/sockets';

import AppError from './errors/AppError';

import routes from './routes';
import uploadConfig from './config/upload';

import RefreshPINTotemService from './services/RefreshPINTotemService';

async function startServer() {
  const app = express();
  await createConnection();

  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(uploadConfig.directory));

  const server = new http.Server(app);
  connectToSocketServer(server);

  app.use(routes);

  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response
          .status(err.statusCode)
          .json({ status: 'error', message: err.message });
      }

      // eslint-disable-next-line no-console
      console.error(err);

      return response
        .status(500)
        .json({ status: 'error', message: 'Internal Server Error' });
    },
  );

  async function refreshPIN() {
    const refreshPINTotem = new RefreshPINTotemService();

    await refreshPINTotem.execute({ socketServer });

    setTimeout(refreshPIN, 10 * 1000);
  }

  // refreshPIN();

  server.listen(process.env.PORT || 3333, () => {
    // eslint-disable-next-line no-console
    console.log('🚀 Server started!');
  });
}
startServer();

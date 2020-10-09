import { ConnectionOptions } from 'typeorm';

const ORMConfig: ConnectionOptions = {
  type: 'postgres' || process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: 5432 || process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ['../models/*.ts' || process.env.TYPEORM_ENTITIES],
  migrations: ['../database/migrations/*.ts' || process.env.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
  },
};

export default ORMConfig;

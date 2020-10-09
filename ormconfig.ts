import { ConnectionOptions } from 'typeorm';

const ORMConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  entities: ['src/models/*.ts' || process.env.TYPEORM_ENTITIES],
  migrations: [
    'src/database/migrations/*.ts' || process.env.TYPEORM_MIGRATIONS,
  ],
  cli: {
    migrationsDir:
      'src/database/migrations' || process.env.TYPEORM_MIGRATIONS_DIR,
  },
};

export default ORMConfig;

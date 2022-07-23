import { Logger } from '@nestjs/common';
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@nestjs/config';
import { Users, Transactions } from '../models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const logger = new Logger('Database provider');
      const configService = new ConfigService();
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        dialectModule: pg,
        logging: (data) => logger.verbose(data),
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });
      sequelize.addModels([Users, Transactions]);
      await sequelize.sync({ alter: true, force: false });
      await sequelize.authenticate();
      return sequelize;
    },
  },
];

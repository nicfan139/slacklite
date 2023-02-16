import 'reflect-metadata';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Channel } from './entity/Channel';
import { Message } from './entity/Message';
import { Preference } from './entity/Preference';
import { User } from './entity/User';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.PG_HOST,
	port: Number(process.env.PG_PORT),
	username: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
	synchronize: false,
	migrationsRun: false,
	logging: false,
	entities: [Channel, Message, User, Preference],
	migrations: [process.env.TYPEORM_MIGRATION_DIR as string],
	subscribers: []
});

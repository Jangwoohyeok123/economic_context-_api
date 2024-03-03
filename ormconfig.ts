import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [],
  synchronize: true, // 한번 true한 뒤로는 무조건 false
  autoLoadEntities: true,
  charset: 'utf8mb4',
  logging: false,
  keepConnectionAlive: true,
};

export = config;

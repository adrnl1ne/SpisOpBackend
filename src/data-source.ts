import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { FoodPost } from './entities/FoodPost';
import { Allergy } from './entities/Allergy';
import { Address } from "./entities/Address";
// Import other entities as necessary

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [FoodPost, Allergy, Address],    // List all entities here
  subscribers: [],
  migrations: [],
});

// Initialize the DataSource when starting the server
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

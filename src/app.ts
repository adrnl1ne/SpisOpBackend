import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import foodPostRoutes from './routes/foodPostRoutes'; // Example route
// Import other routes as necessary
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/foodposts', foodPostRoutes); // Example route
// Register other routes as needed

export default app;

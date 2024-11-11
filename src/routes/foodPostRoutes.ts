import express from 'express';
import { FoodPostController } from '../controllers/FoodPostController';

const app = express();
app.use(express.json());

// Initialize FoodPostController
const foodPostController = new FoodPostController();
app.use('/api', foodPostController.router);

export default app;

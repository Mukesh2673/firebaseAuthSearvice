import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongoConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import setupSwagger from "./docs/swagger.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);


app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

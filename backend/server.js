import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import transactionRoutes from './routes/transactionRoutes.js';
import productRoutes from './routes/productRoutes.js';
import consumerRoutes from './routes/consumerRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();
connectDB();

// ✅ Allow only frontend at http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true, // if you're using cookies or auth headers
}));

app.use(express.json());

app.use('/api/transactions', transactionRoutes);

app.use('/api/products', productRoutes);
app.use('/api/consumers', consumerRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

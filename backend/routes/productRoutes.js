import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Fetch all products with all fields
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // 👈 returns full documents
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

import express from 'express';
import Consumer from '../models/Consumer.js';

const router = express.Router();

// Fetch all consumer documents with all fields
router.get('/', async (req, res) => {
  try {
    const consumers = await Consumer.find(); // 👈 no field restriction
    res.json(consumers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

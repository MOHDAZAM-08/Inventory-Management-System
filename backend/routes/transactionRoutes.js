// backend/routes/transactionRoutes.js
import express from 'express';
import {
  recordIssue,
  recordReturn,
  getTransactions,
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/issue', recordIssue);
router.post('/return', recordReturn);
router.get('/', getTransactions);

export default router;

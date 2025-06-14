import Transaction from '../models/Transaction.js';
import Inventory from '../models/Inventory.js';
import Consumer from '../models/Consumer.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const recordIssue = async (req, res) => {
  const { consumerId, productId, quantity } = req.body;

  try {
    const inventory = await Inventory.findOne({ productId });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }

    if (inventory.stockUnits < quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Insufficient stock to issue' });
    }

    inventory.stockUnits -= quantity;
    await inventory.save();

    const transaction = await Transaction.create({
      consumerId,
      productId,
      quantity,
      type: 'issue',
      timestamp: new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const recordReturn = async (req, res) => {
  const { consumerId, productId, quantity } = req.body;

  try {
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Return quantity must be greater than zero' });
    }

    const consumerObjectId = new mongoose.Types.ObjectId(consumerId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Get total issued
    const totalIssued = await Transaction.aggregate([
      { $match: { consumerId: consumerObjectId, productId: productObjectId, type: 'issue' } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);
    const issued = totalIssued[0]?.total || 0;

    // Get total returned
    const totalReturned = await Transaction.aggregate([
      { $match: { consumerId: consumerObjectId, productId: productObjectId, type: 'return' } },
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);
    const returned = totalReturned[0]?.total || 0;

    const remainingReturnable = issued - returned;

    if (quantity > remainingReturnable) {
      return res.status(400).json({
        message: `Return quantity exceeds issued amount. You can return up to ${remainingReturnable} units.`,
      });
    }

    const inventory = await Inventory.findOne({ productId: productId });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    inventory.stockUnits += quantity;
    await inventory.save();

    const transaction = await Transaction.create({
      consumerId,
      productId,
      quantity,
      type: 'return',
      timestamp: new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTransactions = async (req, res) => {
  try {
    const { startDate, endDate, consumerId, productId, type } = req.query;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const query = {
      timestamp: { $gte: start, $lte: end }
    };

    if (consumerId && mongoose.Types.ObjectId.isValid(consumerId)) {
      query.consumerId = new mongoose.Types.ObjectId(consumerId);
    }

    if (productId && mongoose.Types.ObjectId.isValid(productId)) {
      query.productId = new mongoose.Types.ObjectId(productId);
    }

    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .populate('consumerId', 'name')
      .populate('productId', 'name sku')
      .sort({ timestamp: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

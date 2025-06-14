// backend/models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  consumerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consumer', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['issue', 'return'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);

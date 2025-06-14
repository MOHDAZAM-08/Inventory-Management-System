import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  stockUnits: { type: Number, required: true },
});

export default mongoose.model('Inventory', inventorySchema);

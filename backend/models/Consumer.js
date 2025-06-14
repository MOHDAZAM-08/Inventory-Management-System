import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  contact: String,
});

export default mongoose.model('Consumer', consumerSchema);

import { useState, useEffect } from 'react';
import { recordReturn, getConsumers, getProducts } from '../api';
import { toast } from 'react-toastify';

export default function ReturnForm() {
  const [consumerId, setConsumerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [consumers, setConsumers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getConsumers().then(res => setConsumers(res.data));
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordReturn({ consumerId, productId, quantity });
       toast.success('Product returned successfully!');
      setConsumerId('');
      setProductId('');
      setQuantity('');
    } catch (err) {
      console.error(err);
            toast.error(err.response?.data?.message || err.message || 'Failed to issue product. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-semibold text-center text-green-600">
        Record Product Return
      </h2>

      <div>
        <label className="block text-gray-600 mb-1">Select Consumer</label>
        <select
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ring-green-400"
          required
        >
          <option value="">Choose Consumer</option>
          {consumers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name} ({c.department})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Select Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ring-green-400"
          required
        >
          <option value="">Choose Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.sku})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Units</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter Units"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 ring-green-400"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white cursor-pointer py-2 rounded hover:bg-green-700 transition"
      >
        Return Product
      </button>
    </form>
  );
}

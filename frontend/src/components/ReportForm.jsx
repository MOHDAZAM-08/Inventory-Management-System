import { useState } from 'react';
import { fetchTransactions } from '../api';
import { toast } from 'react-toastify';

export default function ReportForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [consumerId, setConsumerId] = useState('');
  const [productId, setProductId] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = { startDate, endDate };
      if (consumerId) params.consumerId = consumerId;
      if (productId) params.productId = productId;
      if (type) params.type = type;

      const res = await fetchTransactions(params);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch report. Please try again.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 sm:px-4 px-2 ">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
        📊 Transaction Report
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Consumer ID (optional)"
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Product ID (optional)"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">All Types</option>
          <option value="issue">Issue</option>
          <option value="return">Return</option>
        </select>

        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Get Report
        </button>
      </form>

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full shadow rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="p-3 text-left">📅 Date</th>
                <th className="p-3 text-left">👤 Consumer</th>
                <th className="p-3 text-left">📦 Product</th>
                <th className="p-3 text-left">🔢 Quantity</th>
                <th className="p-3 text-left">🔁 Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((tx, idx) => (
                <tr
                  key={tx._id}
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border-b hover:bg-yellow-50 transition`}
                >
                  <td className="p-3 text-sm">{new Date(tx.timestamp).toLocaleString()}</td>
                  <td className="p-3 text-sm font-medium text-blue-700">
                    {tx.consumerId?.name || tx.consumerId}
                  </td>
                  <td className="p-3 text-sm text-indigo-700">
                    {tx.productId?.name || tx.productId}
                  </td>
                  <td className="p-3 text-sm text-center">{tx.quantity}</td>
                  <td
                    className={`p-3 text-sm font-semibold ${tx.type === 'issue' ? 'text-green-600' : 'text-red-600'
                      }`}
                  >
                    {tx.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
    </div>
  );
}

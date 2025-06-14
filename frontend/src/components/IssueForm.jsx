import { useEffect, useState } from 'react';
import { recordIssue, getConsumers, getProducts } from '../api';
import { toast } from 'react-toastify';

export default function IssueForm() {
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
            await recordIssue({ consumerId, productId, quantity });
            toast.success('Product issued successfully!');
            setConsumerId('');
            setProductId('');
            setQuantity('');
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
            toast.error(err.response?.data?.message || err.message || 'Failed to issue product. Please try again.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg space-y-5"
        >
            <h2 className="text-2xl font-semibold text-center text-blue-600">
                Record Product Issue
            </h2>

            <div className="space-y-1">
                <label className="block text-gray-600">Select Consumer</label>
                <select
                    value={consumerId}
                    onChange={(e) => setConsumerId(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            <div className="space-y-1">
                <label className="block text-gray-600">Select Product</label>
                <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            <div className="space-y-1">
                <label className="block text-gray-600">Units</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter Units"
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 cursor-pointer rounded hover:bg-blue-700 transition duration-200"
            >
                Issue Product
            </button>
        </form>
    );
}

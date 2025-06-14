import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Transaction APIs
export const recordIssue = (data) => API.post('/transactions/issue', data);
export const recordReturn = (data) => API.post('/transactions/return', data);
export const fetchTransactions = (params) => API.get('/transactions', { params });

export const getProducts = () => API.get('/products');
export const getConsumers = () => API.get('/consumers');




export default API;

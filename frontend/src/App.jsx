// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import IssuePage from './pages/IssuePage';
import ReturnPage from './pages/ReturnPage';
import ReportPage from './pages/ReportPage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Issue' },
    { path: '/return', label: 'Return' },
    { path: '/report', label: 'Report' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gray-800 text-white px-6 py-4 shadow">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold text-center md:text-left">Inventory Management System</h1>
          <nav className="mt-3 md:mt-0 flex gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1 rounded ${
                  location.pathname === item.path
                    ? 'bg-white text-blue-600'
                    : 'hover:bg-blue-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<IssuePage />} />
          <Route path="/return" element={<ReturnPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;

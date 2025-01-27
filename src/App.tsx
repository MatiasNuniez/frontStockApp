import React from 'react';
import './App.css';
import { Login } from './components/login';
import { BrowserRouter, Routes, Route, useLocation, Form } from 'react-router';
import { Products } from './components/products';
import { Month_end } from './components/month-end';
import { Formulario } from './components/formulario';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/login' || location.pathname === '/resetPassword' ? null : (
        <header className="bg-gray-800 p-4 text-white flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <a href="/products" className="hover:underline font-semibold">
                  Products
                </a>
              </li>
              <li>
                <a href="/history" className="hover:underline font-semibold">
                  History
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={() => console.log('Close session')}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Close Session
          </button>
        </header>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/resetPassword" element={<Login />} />
        <Route path="/history" element={<Month_end />} />
        <Route path="/addProduct" element={<Formulario />} />
        <Route path="/addCategory" element={<Formulario/>} />
      </Routes>
    </>
  );
}

export default App;

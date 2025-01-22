import React from 'react';
import './App.css';
import { Login } from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Products } from './components/products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
        <Route path='/resetPassword' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { useNavigate } from 'react-router';
import './App.css';
import { Login } from './components/login';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { Products } from './components/products';
import { Formulario } from './components/formulario';
import ProtectedRoute from './components/protectedRoute';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const logOut = () => {
    try {
      Cookies.remove('token')
      navigate('/login')
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Error al intentar cerrar sesion.', icon: 'error' })
    }
  }

  return (
    <>
      {location.pathname === '/login' || location.pathname === '/register' ? null : (
        <header className="bg-gray-800 p-4 text-white flex flex-col md:flex-row justify-between items-center">
          <nav className="mb-4 md:mb-0">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <li>
                <a href="/products" className="hover:underline font-semibold">
                  Productos
                </a>
              </li>
              <li>
                <a href="/addProduct" className="hover:underline font-semibold">
                  Cargar productos
                </a>
              </li>
              <li>
                <a href="/addCategory" className="hover:underline font-semibold">
                  Cargar categorias
                </a>
              </li>
            </ul>
          </nav>
          <button
            onClick={logOut}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Cerrar sesion
          </button>
        </header>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/products" element={<ProtectedRoute> <Products /> </ProtectedRoute>} />
        <Route path="/addProduct" element={<ProtectedRoute> <Formulario /> </ProtectedRoute>} />
        <Route path="/addCategory" element={<ProtectedRoute> <Formulario /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;

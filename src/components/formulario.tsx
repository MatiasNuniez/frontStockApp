import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { productInterface } from '../interfaces/product.interface'
import { categoryInterface } from '../interfaces/category.interface'
import Swal from 'sweetalert2'
import axios from 'axios'

export const Formulario: React.FC = () => {
  enum optionEnum {
    product = 'product',
    category = 'category',
  }

  const location = useLocation();
  const [locationState, setlocationState] = useState<string>('');
  
  const [categoryState, setcategoryState] = useState<categoryInterface>({ 
    name: '' 
  });

  const [productState, setproductState] = useState<productInterface>({ 
    name: '', 
    stock: 0, 
    price: 0, 
    quantity: 0, 
    category: 2 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, option: optionEnum) => {
    const { name, value } = e.target;
    
    if (!option || (option !== optionEnum.product && option !== optionEnum.category)) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado una opción o selecciono una opcion incorrecta',
        icon: 'error',
        confirmButtonAriaLabel: 'Ok'
      });
      return;
    }

    if (option === optionEnum.product) {
      setproductState(prev => ({
        ...prev,
        [name]: name === 'name' ? value : Number(value)
      }));
    } else {
      setcategoryState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForms = () => {
    setproductState({
      name: '',
      stock: 0,
      price: 0,
      quantity: 0,
      category: 2
    });
    setcategoryState({
      name: ''
    });
  };

  const addProduct = async () => {
    if (productState.name === '' || productState.stock <= 0 || productState.price <= 0 || productState.quantity <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonAriaLabel: 'Ok'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/products', productState, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.status === 201) {
        Swal.fire({
          title: 'Éxito',
          text: 'Producto agregado correctamente',
          icon: 'success',
          timer: 5000
        });
        resetForms();
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar el producto',
        icon: 'error',
        confirmButtonAriaLabel: 'Ok'
      });
    }
  };

  const addCategory = async () => {
    if (categoryState.name === '') {
      Swal.fire({
        title: 'Error',
        text: 'El nombre de la categoria no puede estar vacio',
        icon: 'error',
        confirmButtonAriaLabel: 'Ok'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/categories', categoryState, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.status === 201) {
        Swal.fire({
          title: 'Éxito',
          text: 'Categoria agregada correctamente',
          icon: 'success',
          timer: 5000
        });
        resetForms();
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar la categoria',
        icon: 'error',
        confirmButtonAriaLabel: 'Ok'
      });
    }
  };

  const addItems = async (option: optionEnum) => {
    option === optionEnum.product ? addProduct() : addCategory();
  };

  useEffect(() => {
    setlocationState(location.pathname === '/addProduct' ? 'product' : 'category');
  }, [location.pathname]);

  return (
    <div>
      <form className="space-y-4 p-4 max-w-lg mx-auto">
        {locationState === 'product' ? (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productState.name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
                onChange={(e) => handleInputChange(e, optionEnum.product)}
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={productState.stock}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
                onChange={(e) => handleInputChange(e, optionEnum.product)}
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productState.price}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
                onChange={(e) => handleInputChange(e, optionEnum.product)}
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Cantidad x Caja
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productState.quantity}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
                onChange={(e) => handleInputChange(e, optionEnum.product)}
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryState.name}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
              onChange={(e) => handleInputChange(e, optionEnum.category)}
            />
          </div>
        )}
        <div>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              e.preventDefault();
              locationState === 'product' ? addItems(optionEnum.product) : addItems(optionEnum.category);
            }}
          >
            {locationState === 'product' ? 'Agregar producto' : 'Agregar categoria'}
          </button>
        </div>
      </form>
    </div>
  );
};
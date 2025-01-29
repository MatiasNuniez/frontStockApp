import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { productInterface } from '../interfaces/product.interface'
import { categoryInterface } from '../interfaces/category.interface'
import Swal from 'sweetalert2'
import axios from 'axios'

export const Formulario = () => {

  enum optionEnum {
    product = 'product',
    category = 'category'
  }

  const location = useLocation();

  const [productState, setproductState] = useState<productInterface>({ name: '', stock: 0, price: 0, quantity: 0, category: 0 })

  const [categoryState, setcategoryState] = useState<categoryInterface>({ name: '' })

  const [locationState, setlocationState] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, option: optionEnum) => {

    if (!option || (option !== optionEnum.product && option !== optionEnum.category)) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado una opción o selecciono una opcion incorrecta',
        icon: 'error',
        confirmButtonAriaLabel:'Ok'
      })
      return;
    }

    if (option === optionEnum.product) {
      setproductState({
        ...productState,
        [e.target.name]: e.target.value
      })
    } else {
      setcategoryState({
        ...categoryState,
        [e.target.name]: e.target.value
      })
    }
  }


  const addProduct = async () => {

    if(productState.name === '' || productState.stock <= 0 || productState.price <= 0 || productState.quantity <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonAriaLabel:'Ok'
      })
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/products', productState, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.status !== 200) {
        Swal.fire({
          title: 'Error',
          text: 'Error al agregar el producto',
          icon: 'error',
          confirmButtonAriaLabel:'Ok'
        })
      }
      Swal.fire({
        title: 'Exito',
        text: 'Producto agregado correctamente',
        icon: 'success',
        timer: 5000
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar el producto',
        icon: 'error',
        confirmButtonAriaLabel:'Ok'
      })
    }
  }

  const addCategory = async () => {

    if(categoryState.name === '') {
      Swal.fire({
        title: 'Error',
        text: 'El nombre de la categoria no puede estar vacio',
        icon: 'error',
        confirmButtonAriaLabel:'Ok'
      })
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/categories', categoryState, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status !== 200) {
        Swal.fire({
          title: 'Error',
          text: 'Error al agregar la categoria',
          icon: 'error',
          confirmButtonAriaLabel:'Ok'
        })
      }
      Swal.fire({
        title: 'Exito',
        text: 'Categoria agregada correctamente',
        icon: 'success',
        timer: 5000
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar la categoria',
        icon: 'error',
        confirmButtonAriaLabel:'Ok'
      })
    }
  }

  const addItems = async (option: optionEnum) => {
    option === optionEnum.product ? addProduct() : addCategory()
  }

  useEffect(() => {
    location.pathname === '/addProduct' ? setlocationState('product') : setlocationState('category')
  }, [location.pathname])

  return (
    <div>
      <form className="space-y-4 p-4 max-w-lg mx-auto">
        {locationState === 'product' ?
          <><div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" onChange={(e) => handleInputChange(e, optionEnum.product)} />
          </div><div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" id="stock" name="stock" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" onChange={(e) => handleInputChange(e, optionEnum.product)} />
            </div><div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" onChange={(e) => handleInputChange(e, optionEnum.product)} />
            </div><div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Cantidad x Caja
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" onChange={(e) => handleInputChange(e, optionEnum.product)} />
            </div></>
          :
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
              onChange={(e) => handleInputChange(e, optionEnum.category)}
            />
          </div>
        }
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
  )
}

import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { productInterface } from '../interfaces/product.interface'
import { categoryInterface } from '../interfaces/category.interface'

export const Formulario = () => {

  const location = useLocation();

  const [productState, setproductState] = useState<productInterface>({name:'',stock:0,price:0,quantity:0,category:''})

  const [categoryState, setcategoryState] = useState<categoryInterface>({name:''})

  return (
    <div>
      <form className="space-y-4 p-4 max-w-lg mx-auto">
      {location.pathname === '/addProduct' ? 
      <><div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" />
          </div><div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input type="number" id="stock" name="stock" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" />
            </div><div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" />
            </div><div>
              <label htmlFor="cantidadxcaja" className="block text-sm font-medium text-gray-700">
                Cantidad x Caja
              </label>
              <input
                type="number"
                id="cantidadxcaja"
                name="cantidadxcaja"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1" />
            </div></>
      : 
      <div>
      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
        Nombre
      </label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-1"
      />
    </div>
      }
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {location.pathname === '/addProduct' ? 'Agregar producto' : 'Agregar categoria'}
          </button>
        </div>
      </form>
    </div>
  )
}

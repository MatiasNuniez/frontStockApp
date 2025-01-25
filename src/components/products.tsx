import React, { useState, useEffect } from 'react'

export const Products = () => {
  
  // const [data, setData] = useState<>([]);

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      console.log(data);
      // setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    
  }, [])  
  
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='font-semibold m-6 text-center text-lg sm:text-xl lg:text-2xl'>Listado de productos</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full sm:w-1/2 lg:w-1/3"
          // onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center mb-4 flex-wrap sm:flex-nowrap">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mx-2 my-1 sm:my-0">
          Vender
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mx-2 my-1 sm:my-0">
          Cargar
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mx-2 my-1 sm:my-0">
          Cerrar mes
        </button>
        <input
          type="text"
          placeholder="Total vendido"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full sm:w-auto lg:w-auto mx-2 my-1 sm:my-0"
          value={`$ ${0}`}
          readOnly
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
          Nombre
        </th>
        <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
          Stock
        </th>
        <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
          Precio
        </th>
        <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
          Cantidad x Caja
        </th>
        <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
          Tipo
        </th>
        <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
          Seleccionado
        </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg font-medium text-gray-900">Product 1</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">100</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">$10.00</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">20</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">Medicamentos</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500"><input type="checkbox" name="selectProduct" id="selectProduct"/></td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

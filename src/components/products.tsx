import React from 'react'

export const Products = () => {
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='font-semibold m-6 text-center text-lg sm:text-xl lg:text-2xl'>Listado de productos</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar producto"
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full sm:w-1/2 lg:w-1/3"
          // onChange={(e) => handleSearch(e.target.value)}
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
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg font-medium text-gray-900">Product 1</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">100</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">$10.00</td>
        <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">20</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

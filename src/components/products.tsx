import React from 'react'

export const Products = () => {
  return (
    <div className='container'>
      <h1 className='text-center font-semibold m-6'>Listado de productos</h1>
      <input
      type="text"
      placeholder="Buscar producto"
      className="mb-4 p-2 border border-gray-300 rounded"
      // onChange={(e) => handleSearch(e.target.value)}
      />
      <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Nombre
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Stock
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Precio
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Cantidad x Caja
        </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Product 1</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$10.00</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20</td>
        </tr>
      </tbody>
      </table>
    </div>
  )
}

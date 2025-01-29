import React, { useState, useEffect } from 'react'
import { productInterface } from '../interfaces/product.interface';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import axios from 'axios';


const filterProducts = (character:Array<productInterface>, buscado:string) => {
  if (!buscado) return character;

  return character.filter((p) => `${p.name}`.toLowerCase().includes(buscado.toLowerCase()));
};


export const Products = () => {

  const [data, setData] = useState<Array<productInterface>>([]);
  const [checkState, setCheckState] = useState<boolean>(false);
  const [idCheckBox, setIdCheckBox] = useState<number>(0);
  const [totalSellMonth, settotalSellMonth] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOnsiaWQiOjEsImVtYWlsIjoibWF0aWFzbnVuaWV6MTkyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoibWF0aWFzMTIzIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjUtMDEtMjBUMDA6NDQ6MzEuMTA3WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDEtMjBUMDA6NDQ6MzEuMTA3WiJ9LCJpYXQiOjE3Mzc4NDUyMTl9.ACma6ix3c20bSOGf0YUWu2RuoUGs3a-bJUPYQt7S8ME`
        }
      });
      const data = response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = async (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = parseInt(e.target.value);
    if (checkState) {
      setIdCheckBox(newId);
      console.log(newId);
      return;
    }
    setCheckState(true);
    setIdCheckBox(newId);
    console.log(newId);
  }

  const increment = async () => {

  }

  const decrement = async () => {

  }


  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='font-semibold m-6 text-center text-lg sm:text-xl lg:text-2xl'>Listado de productos</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full sm:w-1/2 lg:w-1/3"
        onChange={(e) => handleSearch(e)}
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
          value={`$ ${totalSellMonth}`}
          readOnly
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th scope="col" className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
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
          {filterProducts(data, search).map((product) => (
            <tr key={product.id}>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg font-medium text-gray-900"><MdModeEditOutline /></td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg font-medium text-gray-900"><MdDelete /></td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg font-medium text-gray-900">{product.name}</td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">{product.stock}</td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">{product.price}</td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">{product.quantity}</td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">{product.category}</td>
              <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm sm:text-base lg:text-lg text-gray-500">
                <input
                  type="checkbox"
                  name="selectProduct"
                  id={`selectProduct-${product.id}`}
                  checked={checkState && idCheckBox === product.id}
                  value={product.id}
                  onChange={(e) => onChangeCheckBox(e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { productInterface } from '../interfaces/product.interface';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import axios from 'axios';
import { ModalIncreDecre } from './modalIncreDecre';
import { ModalActions } from './modalActions';
import Swal from 'sweetalert2';

const filterProducts = (products: Array<productInterface>, searchTerm: string) => {
  if (!searchTerm) return products;
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const Products = () => {
  const [data, setData] = useState<Array<productInterface>>([]);
  const [checkState, setCheckState] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(-1);
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalOption, setModalOption] = useState<string>('');
  const [selectedActionId, setSelectedActionId] = useState<number>(0);
  const [actionType, setActionType] = useState<string>('');
  const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<productInterface>({
    name: '',
    price: 0,
    category: 0,
    quantity: 0,
    stock: 0
  });

  const getProducts = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const response = await axios.get('http://localhost:3000/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al cargar los productos',
        icon: 'error'
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productId = parseInt(e.target.value);
    setSelectedProductId(productId);
    setCheckState(true);
  };

  const updateStock = (id: number, quantity: number, option: string) => {
    setData(prevData => prevData.map(product => {
      if (product.id === id) {
        return {
          ...product,
          stock: option === "cargar"
            ? product.stock + quantity
            : Math.max(0, product.stock - quantity)
        };
      }
      return product;
    }));
  };

  const updateProduct = (updatedProduct: productInterface) => {
    if (!updatedProduct) return;

    try {
      setData(prevData => prevData.map(product =>
        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
      ));
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: "Error actualizando el producto",
        icon: 'error'
      });
    }
  };

  const deleteProduct = (id: number) => {
    if (!id) {
      Swal.fire({
        title: 'Error',
        text: 'No se encuentra el id a eliminar',
        icon: 'error'
      });
      return;
    }

    try {
      setData(prevData => prevData.filter(product => product.id !== id));
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Error al eliminar producto',
        icon: 'error'
      });
    }
  };

  const handleActionClick = (option: string) => {
    if (selectedProductId === -1 || !checkState) {
      Swal.fire({
        title: 'Error',
        text: 'Seleccione un producto por favor',
        icon: 'error'
      });
      return;
    }
    setModalOption(option);
    setIsModalOpen(true);
  };

  const getTotalSellMonth = async () => {
    try {
      const total = await axios.get('https://localhost:3000/totalSellMonth', { headers: { Authorization: `${localStorage.getItem('token')}` } })
      console.log(`Total del mes: ${total}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
    getTotalSellMonth();
  }, []);

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <h1 className='font-semibold m-6 text-center text-lg sm:text-xl lg:text-2xl'>
        Listado de productos
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full sm:w-1/2 lg:w-1/3"
          onChange={handleSearch}
          value={search}
        />
      </div>

      <div className="flex justify-center mb-4 flex-wrap sm:flex-nowrap gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleActionClick('vender')}
        >
          Vender
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleActionClick('cargar')}
        >
          Cargar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Edit', 'Delete', 'Nombre', 'Stock', 'Precio', 'Cantidad x Caja', 'Tipo', 'Seleccionado'].map((header) => (
                <th
                  key={header}
                  className="px-2 sm:px-4 lg:px-6 py-3 text-left text-xs sm:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterProducts(data, search).map((product) => (
              <tr key={product.id}>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setEditProduct(product);
                      setActionType('edit');
                      setIsActionModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <MdModeEditOutline />
                  </button>
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setSelectedActionId(product.id || -1);
                      setActionType('delete');
                      setIsActionModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <MdDelete />
                  </button>
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-2 sm:px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="checkbox"
                    name="selectProduct"
                    id={`selectProduct-${product.id}`}
                    checked={checkState && selectedProductId === product.id}
                    value={product.id}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalIncreDecre
        isOpen={isModalOpen}
        id={selectedProductId}
        option={modalOption}
        onClose={() => {
          setCheckState(false);
          setSelectedProductId(-1);
          setIsModalOpen(false);
        }}
        changeStock={updateStock}
        setCheckState={setCheckState}
      />

      <ModalActions
        isOpen={isActionModalOpen}
        onClose={() => {
          setSelectedActionId(0);
          setActionType('');
          setEditProduct({
            category: 0,
            name: '',
            price: 0,
            quantity: 0,
            stock: 0
          });
          setIsActionModalOpen(false);
        }}
        id={selectedActionId}
        option={actionType}
        editElement={editProduct}
        changeElement={updateProduct}
        deleteElement={deleteProduct}
      />
    </div>
  );
};
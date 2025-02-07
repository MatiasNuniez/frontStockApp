import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { productInterface } from '../interfaces/product.interface';
import Cookies from 'js-cookie';
import { categoryInterface } from '../interfaces/category.interface';

interface ModalProps {
    editElement: productInterface;
    id?: number;
    option: string;
    isOpen: boolean;
    onClose: () => void;
    changeElement: (element: productInterface) => void;
    deleteElement: (id: number) => void;
}

export const ModalActions: React.FC<ModalProps> = ({
    editElement,
    id,
    option,
    isOpen,
    onClose,
    changeElement,
    deleteElement
}) => {
    const [formData, setFormData] = useState({
        name: '',
        stock: 0,
        price: 0,
        quantity: 0,
        category: '',
        id: -1
    });

    const [categoriesState, setCategoriesState] = useState<Array<categoryInterface>>([])


    const getCategories = async () => {
        try {
            const categories = await axios.get('http://localhost:3000/categories', { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            if (categories.status === 200) {
                setCategoriesState(categories.data)
                return;
            }
            Swal.fire({ title: 'Error', text: 'No se puedo encontrar categorias', icon: 'error' })
        } catch (error) {
            Swal.fire({ title: 'Error', text: 'Error al consultar a la base de datos', icon: 'error' })
        }
    }

    useEffect(() => {
        if (!isOpen) return;

        getCategories();

        setFormData({
            name: editElement.name || '',
            stock: editElement.stock || 0,
            price: editElement.price || 0,
            quantity: editElement.quantity || 0,
            category: editElement.category || '',
            id: option === 'edit' ? editElement.id || -1 : id || -1
        });
    }, [editElement, id, option, isOpen]);


    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'name' ? value : Number(value)
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAction = async () => {
        if (option === 'edit') {
            try {
                const productUpdate = {
                    name: formData.name,
                    price: formData.price,
                    stock: formData.stock,
                    quantity: formData.quantity,
                    category: formData.category
                };

                const token = Cookies.get('token');
                const response = await axios.patch(
                    `http://localhost:3000/products/${formData.id}`,
                    productUpdate,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                if (response.status === 204) {
                    await Swal.fire({
                        title: 'Éxito',
                        text: 'Se editó el producto correctamente',
                        icon: 'success'
                    });
                    changeElement({ ...productUpdate, id: formData.id });
                    onClose();
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al editar el producto',
                    icon: 'error'
                });
            }
            return;
        }

        try {
            const token = Cookies.get('token');
            const response = await axios.delete(
                `http://localhost:3000/products/${formData.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 204) {
                await Swal.fire({
                    title: 'Éxito',
                    text: 'Se eliminó el producto correctamente',
                    icon: 'success'
                });
                deleteElement(formData.id);
                onClose();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al eliminar el producto',
                icon: 'error'
            });
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 absolute inset-0" onClick={onClose} />
            <div className="bg-white rounded-lg shadow-lg p-6 relative z-10 w-full max-w-md">
                {option === 'edit' ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleAction(); }} className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
                        <div className="space-y-3">
                            <label className="block">
                                <span className="text-gray-700">Nombre:</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Stock:</span>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Precio:</span>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Cantidad:</span>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Categoría:</span>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleSelectChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categoriesState.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Eliminar Producto</h2>
                        <p className="text-gray-600">¿Estás seguro que deseas eliminar este producto?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleAction}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
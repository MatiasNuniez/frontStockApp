import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    id: number;
    option: string;
    changeStock: (id: number, quantity: number, option: string) => void;
    setCheckState: (checkState: boolean) => void;
}

export const ModalIncreDecre: React.FC<ModalProps> = ({ isOpen, onClose, id, option, changeStock, setCheckState }) => {
    const [quantity, setQuantity] = useState<number>(0);

    const handleAction = async () => {
        if (quantity > 0) {
            try {
                const endpoint = `http://localhost:3000/products/${id}/${option === 'cargar' ? 'incrementStock' : 'decrementStock'}`;
                const response = await axios.patch(endpoint, { quantity }, 
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`} 
                });
                
                if (response.status === 204) {
                    Swal.fire('Éxito', 'Operación realizada con éxito', 'success');
                    changeStock(id, quantity, option);
                    setCheckState(false);
                    onClose();
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo completar la operación', 'error');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-80 text-center">
                <h3 className="text-lg font-semibold mb-4">¿Cuántas cajas desea {option === 'cargar' ? 'agregar' : 'vender'}?</h3>
                <input 
                    type="number" 
                    className="w-full p-2 border rounded-md mb-4"
                    placeholder="Cantidad" 
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                />
                <div className="flex justify-around">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleAction}>
                        {option === 'cargar' ? 'Cargar' : 'Vender'}
                    </button>
                    <button className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

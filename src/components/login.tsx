import React, { useEffect, useState } from 'react'
import { LoginI } from '../interfaces/user.interfaces';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export const Login: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [loginState, setLoginState] = useState<LoginI>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setLoginState({
                ...loginState,
                [e.target.name]: e.target.value
            })
    }

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', loginState, {withCredentials:true});
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Sesion iniciada correctamente',
                })
                setTimeout(() => { navigate('/products') }, 150)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesion',
                text: `${error}`,
            })
        }
    }

    useEffect(() => {
        const validateToken = async () => {
            try {
                let token = Cookies.get('token');
                const response = await axios.get("http://localhost:3000/auth/verify", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                if (response.status === 200) {
                    navigate('/products');
                }
            } catch (error) {
                console.log('Token is not valid or does not exist');
            }
        };

        validateToken();
    }, [navigate]);


    return (
        <div className='h-screen flex justify-center items-center bg-gray-100'>
            <div className={`container grid ${location.pathname === '/login' ? 'grid-rows-5' : 'grid-rows-3'} place-items-center border-2 border-gray-300 p-6 rounded-md bg-white gap-4 shadow-xl lg:w-1/3`}>
                <h1 className='text-xl font-bold'>{location.pathname === '/login' ? 'StockApp - Inicio de sesion' : 'Ingrese el email a recuperar'}</h1>

                <div className='row-span-2 grid grid-rows-2 gap-6 w-3/4'>
                        <>
                            <input name="email" type="email" placeholder='Correo Electronico' className='p-2 rounded-md bg-gray-100' onChange={handleChange} />
                            <input name="password" type="password" placeholder='Contaseña' className='p-2 rounded-md bg-gray-100' onChange={handleChange} />
                        </>
                </div>

                <button className='bg-blue-500 text-white w-3/4 rounded-md p-2' onClick={login}>Iniciar Sesion</button>
            </div>
        </div>
    )
}
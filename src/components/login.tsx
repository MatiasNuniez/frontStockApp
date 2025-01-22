import React, { useEffect, useState } from 'react'
import { LoginI } from '../interfaces/user.interfaces';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Login: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();


    const [loginState, setLoginState] = useState<LoginI>({ email: '', password: '' });
    const [resetState, setResetState] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(location.pathname === '/login'){
            setLoginState({
                ...loginState,
                [e.target.name]: e.target.value
            })
        }else{
            setResetState(e.target.value);
        }
    }

    const recuperar = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/resetPassword', resetState);
            if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'OK',
                text: 'Correo enviado correctamente',
            });
            setTimeout(() => { navigate('/') }, 150);
            }
        } catch (error) {
            Swal.fire({
            icon: 'error',
            title: 'Error al enviar el correo',
            text: `${error}`,
            });
        }
    }

    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', loginState);
            if (response.status === 200) {
                console.log(response);
                localStorage.setItem('token', response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Sesion iniciada correctamente',
                })
                setTimeout(() => { navigate('/') }, 150)
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesion',
                text: `${error}`,
            })
        }
    }


    return (
        <div className='h-screen flex justify-center items-center bg-gray-100'>
            <div className={`container grid ${location.pathname === '/login' ? 'grid-rows-5' : 'grid-rows-3'} place-items-center border-2 border-gray-300 p-6 rounded-md bg-white gap-4 shadow-xl lg:w-1/3`}>
                <h1 className='text-xl font-bold'>{location.pathname === '/login' ? 'StockApp - Inicio de sesion' : 'Ingrese el email a recuperar'}</h1>

                <div className={`row-span-2 grid ${location.pathname === '/login' ? 'grid-rows-2' : 'grid-rows-1'} gap-6 w-3/4`}>
                    {location.pathname === '/login' ?
                        <>
                            <input name="email" type="email" placeholder='Correo Electronico' className='p-2 rounded-md bg-gray-100' onChange={handleChange} />
                            <input name="password" type="password" placeholder='Contaseña' className='p-2 rounded-md bg-gray-100' onChange={handleChange} />
                        </>
                        :
                        <input name="email" type="email" placeholder='Correo Electronico' className='p-2 rounded-md bg-gray-100' onChange={handleChange} />

                    }
                </div>

                <button className='bg-blue-500 text-white w-3/4 rounded-md p-2' onClick={location.pathname === '/login' ? login : recuperar}>{location.pathname === '/login' ? 'Iniciar Sesion' : 'Enviar email'}</button>

                {location.pathname === '/login' ? <p className='row-span-1'>Olvidaste tu contraseña? <a href="/resetPassword" className='text-blue-500 hover:text-blue-800'
                    onClick={() => navigate('/resetPassword')} >Click aquí</a></p>
                    : null}
            </div>
        </div>
    )
}
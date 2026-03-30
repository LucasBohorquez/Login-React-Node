import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { createUser, getUsers, getMe, logoutUser } from '../services/CRUD'



export default function Register() {
    const [logUser, setLogUser] = useState(null)
    const [user, setUser] = useState({
        nae: '',
        email: '',
        password: '',
        pin: ''
    })
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers()
            setUsers(res)
        }
        fetchUsers()
    }, [])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMe()
            setLogUser(userData)
        }
        fetchUser()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if (!user.email || !user.password) {
                alert('Por favor, completa todos los campos')
                return
            }
            else if (!/\S+@\S+\.\S+/.test(user.email)) {
                alert('Por favor, ingresa un correo electrónico válido')
                return
            } else if (user.password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres')
                return
            }
            else if (users.some(u => u.email === user.email)) {
                alert('El correo electrónico ya está registrado')
                return
            } else {
                createUser(user)
                alert('Usuario registrado exitosamente')
            }
        } catch { }
    }

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await logoutUser()
            window.location.reload(false)
        } catch { }
    }

    if (logUser) {
        return <div className='h-dvh flex flex-col items-center justify-center gap-10 max-md:text-center max-lg:text-center'>
            <div>
                <h1 className='text-3xl text-center'>Bienvenido, {logUser.name}!</h1>
                <p className='text-lg text-center'>Ya has iniciado sesión. Redirigete al Dashboard... O cierra sesión</p>
            </div>
            <div className='flex gap-30 max-sm:flex-col max-sm:gap-20 max-sm:items-center max-md:gap-10 max-lg:gap-10'>
                <Link to='/Dashboard' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Ir al Dashboard</Link>
                <Link onClick={handleLogout} className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Cerrar Sesión</Link>
            </div>
        </div>
    }


    return (
        <>
            <div className='flex flex-col items-center gap-30 justify-center h-dvh'>

                <div className='flex flex-col bg-white items-center justify-center gap-16 w-[1000px] h-[90%] p-[80px] rounded-[50px] max-sm:w-[90%] max-sm:gap-2 max-sm:text-center max-sm:rounded-[20px] max-md:w-[90%] max-lg:w-[90%]'>
                    <div className='justify-items-center'>
                        <h1 className='text-5xl max-sm:text-2xl max-md:text-4xl max-lg:text-[44px] '>Bienvenido/a al Registro</h1>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-10 items-center max-sm:gap-4' >

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="correo" className='text-start'>Nombre</label>
                            <input onChange={handleChange} type="text" name='name' id='correo' placeholder='Escribe tu Nombre' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="correo" className='text-start'>Correo</label>
                            <input onChange={handleChange} type="email" name='email' id='correo' placeholder='Escribe tu correo' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña" className='text-start'>Contraseña</label>
                            <input onChange={handleChange} type="password" name='password' id='contraseña' placeholder='Escribe tu contraseña' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="correo" className='text-start'>PIN</label>
                            <input onChange={handleChange} type="number" maxLength={4} name='pin' id='correo' placeholder='Escribe un pin de 4 digitos' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer' type='submit'>Registrarse</button>
                    </form>
                    <p className='max-sm:flex max-sm:flex-col max-sm:gap-3'><span className='max-sm:text-[12px]'>¿Ya tienes una cuenta?</span> <Link to='/Login' className='font-bold cursor-pointer mr-3.5'>Inicia Sesión</Link></p>
                </div>
            </div>
        </>
    )
}

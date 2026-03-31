import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUsers, loginUser, getMe, logoutUser } from '../services/CRUD'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const [logUser, setLogUser] = useState(null)
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const Navigate = useNavigate()

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

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await getUsers()
            setUsers(res)
        }
        fetchUsers()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!user.email || !user.password) {
                alert('Por favor, completa todos los campos')
                return
            }
            else if (!/\S+@\S+\.\S+/.test(user.email)) {
                alert('Por favor, ingresa un correo electrónico válido')
                return
            }
            else if (user.password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres')
                return
            }
            else if (!users.some(u => u.email === user.email)) {
                alert('El correo electrónico no está registrado')
                return
            }
            else {
                try {
                    await loginUser(user)
                    Navigate('/Dashboard')
                }
                catch { }

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
                <Link to='/Dashboard' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center active:bg-gray-700'>Ir al Dashboard</Link>
                <Link onClick={handleLogout} className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center active:bg-gray-700'>Cerrar Sesión</Link>
            </div>
        </div>
    }

    return (
        <>
            <div className='flex flex-col items-center gap-30 justify-center h-dvh'>

                <div className='flex flex-col bg-white items-center justify-center gap-16 w-[1000px] h-[90%] p-[80px] rounded-[50px] max-sm:w-[90%] max-sm:gap-4 max-sm:text-center max-sm:rounded-[20px] max-md:w-[90%] max-lg:w-[90%]'>
                    <div className='justify-items-center'>
                        <h1 className='text-5xl text-center max-sm:text-4xl max-md:text-4xl max-lg:text-[44px]'>Bienvenido/a al Inicio de Sesion</h1>
                    </div>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2 max-sm:text-start'>
                            <label htmlFor="correo">Correo</label>
                            <input onChange={handleChange} type="email" name='email' id='correo' placeholder='Escribe tu correo' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-end'>
                                <label htmlFor="contraseña">Contraseña</label>
                                <Link className='olvidona' to='/Recover'>¿Olvidaste tu contraseña?</Link>
                            </div>
                            <input onChange={handleChange} type="password" name='password' id='contraseña' placeholder='Escribe tu contraseña' />
                        </div>
                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer active:bg-gray-700' type='submit'>Iniciar Sesion</button>
                    </form>
                    <p className='max-sm:flex max-sm:flex-col max-sm:gap-3'><span className='max-sm:text-[12px]'>¿No tienes una cuenta?</span> <Link to='/Register' className='font-bold cursor-pointer mr-3.5'>Regístrate</Link> <Link className='olvidona2' to='/Recover'>¿Olvidaste tu contraseña?</Link></p>
                </div>
            </div>
        </>
    )
}

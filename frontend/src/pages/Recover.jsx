import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { recovery, getMe, pinReview, getUsers, logoutUser } from '../services/CRUD'
import { useNavigate } from 'react-router-dom'


export default function Recover() {
    const [logUser, setLogUser] = useState(null)
    const [pinVerified, setpinVerified] = useState(true)
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

    
    
    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await logoutUser()
            window.location.reload(false)
        } catch { }
    }
    
    const [pines, setPines] = useState({
        email: '',
        pin: ''
    })
    
    const handleChangepin = (e) => {
        setPines({
            ...pines,
            [e.target.name]: e.target.value
        })
    }
    
    
    const handleSubmitpin = async (e) => {
        e.preventDefault()
        try {
            if (!pines.pin) {
                alert('Por favor, completa todos los campos')
                return
            } else if (pines.pin.length < 4) {
                alert('El pin debe tener al menos 4 caracteres')
                return
            } else {
                await pinReview({
                    userData: {
                        email: pines.email,
                        pin: pines.pin
                    }
                })
                alert('Pin Verificado exitosamente')
                setpinVerified(false)
            }
        } catch { }
    }

    
    const handleSubmitupdate = async (e) => {
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
            else{
                await recovery({
                    userData:{
                        email: user.email,
                        password: user.password
                    }
                })
                alert('Contraseña Actualizada')
            }
        } catch {}
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

                <div className='flex flex-col bg-white items-center justify-center gap-16 w-[1000px] h-[90%] p-[80px] rounded-[50px] max-sm:w-[90%] max-sm:gap-4 max-sm:text-center max-sm:rounded-[20px] max-md:w-[90%] max-lg:w-[90%]'>
                    <div className='justify-items-center'>
                        <h1 className='text-5xl max-sm:text-2xl max-md:text-4xl max-lg:text-[44px]'>Recuperar Contraseña</h1>
                    </div>

                    <form onSubmit={handleSubmitpin} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña">Correo</label>
                            <input onChange={handleChangepin} onInput={handleChange} type="email" name='email' id='contraseña' placeholder='Escribe tu correo' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña">Verificar Pin</label>
                            <input onChange={handleChangepin} type="text" maxLength={4} name='pin' id='contraseña' placeholder='Escribe tu pin' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer' type='submit'>Verificar</button>

                    </form>

                    <form onSubmit={handleSubmitupdate} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña">Contraseña</label>
                            <input onChange={handleChange} type="password" readOnly={pinVerified} name='password' id='contraseña' placeholder='Actualiza tu contraseña' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer' type='submit'>Actualizar</button>

                    </form>
                    <p><Link to='/Login' className='font-bold cursor-pointer mr-3.5'>Inicia Sesión</Link> <Link to='/Register' className='font-bold cursor-pointer mr-3.5'>Regístrate</Link></p>
                </div>
            </div>
        </>
    )
}
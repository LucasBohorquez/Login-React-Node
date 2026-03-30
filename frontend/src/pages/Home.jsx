import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMe, logoutUser } from '../services/CRUD'

export default function Home() {
    const [logUser, setlogUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getMe()
            setlogUser(res)
        }
        fetchUser
    }, [])

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            await logoutUser(logUser)
            window.location.refresh(false)
        } catch {}
    }

    if (logUser) {
        return <div className='h-dvh flex flex-col items-center justify-center gap-10max-md:text-center max-lg:text-center '>
            <div>
                <h1 className='text-3xl text-center'>Bienvenido, {logUser.name}!</h1>
                <p className='text-lg text-center'>Ya has iniciado sesión. Redirigete al Dashboard... O cierra sesión</p>
            </div>
            <div className='flex gap-30'>
                <Link to='/Dashboard' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Ir al Dashboard</Link>
                <Link onClick={handleLogout} to='/Login' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Cerrar Sesión</Link>
            </div>
        </div>
    }

    return (
        <>

            <div className='flex flex-col items-center gap-30 justify-center h-dvh max-md:text-center max-lg:text-center text-white'>
                <h1 className='text-5xl max-sm:text-4xl max-sm:text-center'>Un placer, escoge que hacer por siguiente</h1>

                <div className='flex text-3xl gap-100 max-sm:flex-col max-sm:gap-20 max-sm:items-center max-md:gap-10 max-lg:gap-10'>
                    <Link to='/Login' className='enlace'>Iniciar Sesión</Link>
                    <Link to='/Register' className='enlace'>Regístrarte</Link>
                </div>
            </div>
        </>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { updateUser, getMe, pinReview } from '../services/CRUD'



export default function Update() {
    const [logUser, setLogUser] = useState(null)
    const [pinVerified, setpinVerified] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMe()
            setLogUser(userData)
        }
        fetchUser()
    }, [])

    const [user, setUser] = useState({
        password: ''
    })
    
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }   
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!user.password) {
                alert('Por favor, completa todos los campos')
                return
            } else if (user.password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres')
                return
            } else {
                await updateUser({ id: logUser?.id, userData: user })
                alert('Contraseña actualizada exitosamente')
            }
        } catch {
            console.error('Error al actualizar el usuario')
            alert('Error al actualizar el usuario')
        }
    }
    
    const [pines, setPines] = useState({
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
                await pinReview({ userData: {
                    email: logUser?.email,
                    pin: pines.pin
                } })
                alert('Pin Verificado exitosamente')
                setpinVerified(false)
            }
        } catch {}
    }
    


    return (
        <>
            <div className='flex flex-col items-center gap-30 justify-center h-dvh'>

                <div className='flex flex-col bg-white items-center justify-center gap-16 w-[1000px] h-[90%] p-[80px] rounded-[50px] max-sm:w-[90%] max-sm:gap-4 max-sm:text-center max-sm:rounded-[20px] max-md:w-[90%] max-lg:w-[90%]'>
                    <div className='justify-items-center'>
                        <h1 className='text-5xl text-center max-sm:text-4xl max-md:text-4xl max-lg:text-[44px]'>Actualizar Contraseña</h1>
                    </div>

                    <form onSubmit={handleSubmitpin} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña">Verificar Pin</label>
                            <input onChange={handleChangepin} type="text" maxLength={4} name='pin' id='contraseña' placeholder='Escribe tu pin' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer' type='submit'>Verificar</button>

                    </form>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña">Contraseña</label>
                            <input onChange={handleChange} type="password" readOnly={pinVerified} name='password' id='contraseña' placeholder='Actualiza tu contraseña' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer' type='submit'>Actualizar</button>

                    </form>
                    <p><Link to='/Dashboard' className='font-bold cursor-pointer'>Ir al Dashboard</Link></p>
                </div>
            </div>
        </>
    )
}
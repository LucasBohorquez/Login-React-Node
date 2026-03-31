import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMe, pinReview, deleteUser, logoutUser } from '../services/CRUD'

export default function Delete() {
    const [pinVerified, setpinVerified] = useState(true)
    const [logUser, setLogUser] = useState(null)
    const [number, setNumber] = useState(0);

    const Navigate = useNavigate()

    useEffect(() => {
      
      const newNumber = Math.floor(1000 + Math.random() * 9000);
          setNumber(newNumber);

    }, []);


    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getMe()
            setLogUser(userData)
        }
        fetchUser()
    }, [])

    const clave = logUser?.name + number

    const [pines, setPines] = useState({
        pin: ''
    })

    const handleChangepin = (e) => {
        setPines({
            ...pines,
            [e.target.name]: e.target.value
        })
    }

    const [DeleteUser, setDeleteUser] = useState({
        key: ''
    })

    const handleChangedelete = (e) => {
        setDeleteUser({
            ...DeleteUser,
            [e.target.name]: e.target.value
        })
    }
    console.log(DeleteUser)


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
                        email: logUser?.email,
                        pin: pines.pin
                    }
                })
                alert('Pin Verificado exitosamente')
                setpinVerified(false)
            }
        } catch { }
    }

    const handleSubmitdelete = async (e) => {
        e.preventDefault()
        try {
            if(!DeleteUser.key){
                alert('Por favor, completa todos los campos')
            }
            else if(DeleteUser.key !== clave){
                alert('Escriba la clave correctamente')
            }
            else{
                await deleteUser({id: logUser?.id})
                alert('Cuenta Borrada Exitosamente')
                await logoutUser()
                setTimeout(() => {
                  Navigate('/Login')
                }, 200)
            }

        } catch { }
    }


    return (
        <>
            <div className='flex flex-col items-center gap-30 justify-center h-dvh'>

                <div className='flex flex-col bg-white items-center justify-center gap-16 w-[1000px] h-[90%] p-[80px] rounded-[50px] max-sm:w-[90%] max-sm:gap-4 max-sm:text-center max-sm:rounded-[20px] max-md:w-[90%] max-lg:w-[90%]'>
                    <div className='justify-items-center'>
                        <h1 className='text-5xl text-center max-sm:text-4xl max-md:text-4xl max-lg:text-[44px]'>Borrar Cuenta</h1>
                    </div>

                    <form onSubmit={handleSubmitpin} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="contraseña">Verificar Pin</label>
                            <input onChange={handleChangepin} type="text" maxLength={4} name='pin' id='contraseña' placeholder='Escribe tu pin' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white cursor-pointer active:bg-gray-700' type='submit'>Verificar</button>

                    </form>

                    <form onSubmit={handleSubmitdelete} className='flex flex-col gap-10 items-center' >

                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-end'>
                            <label htmlFor="contraseña">Escribe "{logUser?.name}{number}" </label><span className='text-[15px] opacity-25 max-sm:hidden'>Sin las comillas</span>
                            </div>
                            <input onChange={handleChangedelete} type="text" readOnly={false} name='key' id='contraseña' placeholder='Escribe tu pin' />
                        </div>

                        <button className='border rounded-2xl p-2 w-[500px] bg-black text-white text-center cursor-pointer active:bg-gray-700' type='submit'>Borrar la Cuenta</button>

                    </form>

                    <p><Link to='/Dashboard' className='font-bold cursor-pointer mr-3.5'>Volver</Link> </p>
                </div>
            </div>
        </>
    )
}
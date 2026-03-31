import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMe, logoutUser } from '../services/CRUD'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [clicks, setClicks] = useState(0)
  const [jugando, setJugando] = useState(false)
  const [tiempo, setTiempo] = useState(10)


useEffect(()=>{
  if (!jugando) return

  const intervalo = setInterval(()=>{
    setTiempo(prev =>{
      if(prev <= 1){
        clearInterval(intervalo)
        alert('Tiempo Acabado')
        setJugando(false)
        return 0
      }
      return prev - 1
    })
  }, 1000)
  return () => clearInterval(intervalo)
}, [jugando])

const handleClick = () =>{
  if(!jugando)return
  setClicks(prev => prev + 1)
}

const iniciarJuego = () =>{
  setTiempo(10)
  setClicks(0)
  setJugando(true)
}



  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getMe()
      setUser(userData)
    }

    fetchUser()
  }, [])
  if (!user) {
    return <div>Cargando...</div>
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await logoutUser()
    } catch {}
    setTimeout(() => {
      navigate('/Login')
    }, 200)
  }

    


  return (
    <>
    <div>
      <h1 className='text-3xl'>Bienvenido al Dashboard, {user.name}</h1>
      <div className='flex gap-10'>
        <Link onClick={handleLogout} to='/Login' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Cerrar Sesión</Link>
        <Link to='/Update' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center active:bg-gray-700'>Cambiar Contraseña</Link>
        <Link to='/Delete' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center active:bg-gray-700'>Borrar la Cuenta</Link>
      </div>

      <div className='flex flex-col items-center gap-10'>
      <h1 className='text-2xl'>Clicks</h1>

      <p className='text-4xl'>Tiempo: {tiempo}s</p>
      <p className='text-4xl'>Clicks: {clicks}</p>

      {!jugando ? (
        <button onClick={iniciarJuego} className='border w-[180px] rounded-2xl active:bg-blue-500 active:text-red-500 p-3 cursor-pointer text-3xl'>
          {tiempo === 0 ? 'Reintentar' : 'Iniciar'}
        </button>
      ) : (
        <button onClick={handleClick} className='border w-[180px] rounded-2xl active:bg-black active:text-white p-3 cursor-pointer text-4xl'>
          ¡CLICK!
        </button>
      )}
    </div>
      
        </div>
    </>
  )

}
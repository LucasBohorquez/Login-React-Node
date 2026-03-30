import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMe, logoutUser, getUsers } from '../services/CRUD'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUsers()
      setUsers(userData)
    }
    fetchUser()
  }, [])

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

  if (!users) {
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
      <h1 className='text-3xl'>Bienvenido al Dashboard, {user.name}</h1>
      <div className='flex gap-10'>
        <Link onClick={handleLogout} to='/Login' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Cerrar Sesión</Link>
        <Link to='/Update' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Cambiar Contraseña</Link>
        <Link to='/Delete' className='border p-2 mt-5 rounded-[8px] w-[200px] bg-black text-white cursor-pointer text-center'>Borrar la Cuenta</Link>
      </div>

      <div className='border p-2 mt-5 rounded-[8px] w-[300px] justify-items-center'>
        <h2 className='font-bold'>Usuarios registrados:</h2>
        {users && users.map((u) => (
          <p key={u.id}>{u.name}</p>
        ))}
      </div>
    </>
  )

}
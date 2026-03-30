import { Api } from "../services/api";
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PublicRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(()=>{
    const checkAuth = async () =>{
        try{
            await Api.get('/me')
            setIsAuth(true)
        }catch{
            setIsAuth(false)
          
        }
    }
    checkAuth()
  }, [])
  if (isAuth === null) {
    return <div>Cargando...</div>
  }
    if (isAuth) {
        return <Navigate to="/Dashboard" />
    }
    return children
}

export { PublicRoute as Public }
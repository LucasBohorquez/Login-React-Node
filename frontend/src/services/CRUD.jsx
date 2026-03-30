import { Api } from "./api.jsx"
import { Navigate } from "react-router-dom"


 export const getUsers = async () =>{
    const res = await Api.get('/Users')
    return res.data
}

export const getMe = async () =>{
    try{
        const res = await Api.get('/me')
        return res.data
    }
    catch{
        console.error('Esperando autenticacion')
    }
}


export const createUser = async (userData) => {
    try {
        const res = await Api.post('/Register', userData)
        return res.data
    } catch(error){
        alert('Error al crear el usuario')
        throw error
    }
}

export const loginUser = async (userData) =>{
    try{
        const res = await Api.post('/Login', userData)
        return res.data
    } catch(error){
        alert('Contraseña Incorrecta')
        throw error
    }
}

export const logoutUser = async () => {
    try{
        const res = await Api.post('/Logout')
        return res.data
        
    } catch(error) {
        alert('Error al cerrar sesión')
        throw error
    }
}

export const updateUser = async ({ id, userData }) =>{
    try{
        const res = await Api.patch(`/User/${id}`, userData)
        return res.data
    } catch(error){
        alert('Error al actualizar el usuario')
        throw error
    }
}

export const pinReview = async ({ userData }) =>{
    try{
        const res = await Api.post('/Pin', userData)
        console.log(res)
        return res.data
    }catch(error){
        alert('Pin incorrecto')
        throw error
    }
}

export const recovery = async ({ userData }) =>{
    try{
        const res = await Api.patch('/Recover', userData)
        return res.data
    }catch(error){
        alert('No se pudo actualizar')
        throw error
    }
}

export const deleteUser = async ({ id }) =>{
    try{
        const res = await Api.delete(`/User/${id}`)
        return res.data
    }catch(error){
        alert('No se pudo eliminar')
        throw error
    }
}
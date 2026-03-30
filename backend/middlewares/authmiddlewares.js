import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from "../config.js";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token

    if(!token){
        return res.status(401).json({ message: 'Acceso no autorizado' })
    }
    try{
        const decoded = jwt.verify(token, SECRET_JWT_KEY)
        req.user = decoded
        next()
    } catch (error){
        return res.status(403).json({ message: 'Token inválido' })
    }
}
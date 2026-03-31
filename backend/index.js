import 'dotenv/config'
import express from 'express'
import { PORT } from './config.js'
import cors from 'cors'
import { createUsersRouter } from './routes/users.js'
import cookieParser from 'cookie-parser'


export const createApp = ({ userModel }) => {
const app = express()
app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')

app.use(cors({
   origin: (origin, callback) => {
    const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://localhost:5173/Login',
        'http://localhost:5173/Register',
        'https://login-react-node-production.up.railway.app/',
        'https://login-react-node-production.up.railway.app/Users',
        'https://login-react-node-production.up.railway.app/Register',
        'https://login-react-node-production.up.railway.app/Login',
        'https://login-react-node-production.up.railway.app/me',
        'https://login-react-node-production.up.railway.app/Logout',
        'https://login-react-node-production.up.railway.app/User/:id',
        'https://login-react-node-production.up.railway.app/User/:id',
        'https://login-react-node-production.up.railway.app/Recover',
        'https://login-react-node-production.up.railway.app/Pin',
        'https://login-react-node-production.up.railway.app/User/:id',
        'https://login-react-node-alpha.vercel.app/Login',
        'https://login-react-node-alpha.vercel.app/Register',
        'https://login-react-node-alpha.vercel.app/Dashboard',
        'https://login-react-node-alpha.vercel.app/Update',
        'https://login-react-node-alpha.vercel.app/Delete',
        'https://login-react-node-alpha.vercel.app/Recover',
    ]
    if(allowedOrigins.includes(origin)){
        return callback(null, true)
    }
    if(!origin){
        return callback(null, true)
    }
    return callback(new Error('Origen no permitido por CORS'))
},
credentials: true
}))


app.use('/', createUsersRouter({ userModel}))


app.listen(PORT, () =>{
    console.log(`Server desplegado en el puerto: http://localhost${PORT}`)
})
}


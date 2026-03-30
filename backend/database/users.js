import mysql from 'mysql2/promise'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { error } from 'node:console'
import 'dotenv/config'
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} from '../config.js'



const config = {
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME
}

const conn = await mysql.createConnection(config)

export class UserModel {
    static getAll = async () => {
        const [users] = await conn.query('SELECT * FROM usuario')
        console.log(users)
        return users
    }

    static getById = async ({ id }) => {
        const [user] = await conn.query('SELECT * FROM usuario WHERE id = ?', [id])
        if (user.length === 0) return null
        console.log(user)
        return user[0]
    }

    static create = async ({ userData }) => {
        const { name, email, password, pin } = userData
        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, 10)
        const hashedPin = await bcrypt.hash(pin, 10)

        const [existingUser] = await conn.query('SELECT * FROM usuario WHERE email = ?', [email])
        if (existingUser.length > 0) {
            throw new Error('El correo electrónico ya está en uso')
        }
        const [user] = await conn.query('INSERT INTO usuario(id, name, email, password, pin) VALUES (?, ?, ?, ?, ?)', [id, name, email, hashedPassword, hashedPin])
        console.log(user)

        if (user.affectedRows === 0) {
            throw new Error('Error al crear el usuario')
        }

        const [newUser] = await conn.query('SELECT * FROM usuario WHERE id = ?', [id])
        console.log(newUser)
        return newUser[0].message || 'Usuario creado'


    }

    static login = async ({ userData }) => {

        const { email, password } = userData

        const [users] = await conn.query('SELECT * FROM usuario WHERE email = ?', [email])


        if (users.length === 0) {
            throw new Error('Credenciales inválidas')
        }

        const user = users[0]

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) throw new Error('Contraseña incorrecta')


        return users

    }

    static getMe = async ({ id }) => {

        const [user] = await conn.query('SELECT * FROM usuario WHERE id = ?', [id])
        if (user.length === 0) return null
        console.log(user)
        return user[0]
    }



    static update = async ({ id, userData }) => {
        const updatedField = {}
        if (userData.password) {
            updatedField.password = await bcrypt.hash(userData.password, 10)
        }
    
        if (userData.pin) {
            updatedField.pin = await bcrypt.hash(userData.pin, 10)
        }

        const [user] = await conn.query('UPDATE usuario SET ? WHERE id = ?', [updatedField, id])
        console.log(user)
        if (user.affectedRows === 0) {
            throw new Error('Error al actualizar el usuario')
        }
        return ('Usuario actualizado')

    }

    static recovery = async ({ userData }) =>{
        const { email } = userData
        const updatedField = {}
        if(userData.password){
            updatedField.password = await bcrypt.hash(userData.password, 10)
        }
        const [user] = await conn.query('UPDATE usuario SET ? WHERE email = ?', [updatedField, email])
         console.log(user)
        if (user.affectedRows === 0) {
            throw new Error('Error al actualizar la contraseña')
        }
        return ('Contraseña actualizado')
    }

    static pinReview = async ({ userData }) => {
        const { email, pin } = userData

        const [users] = await conn.query('SELECT * FROM usuario WHERE email = ?', [email])

        if (users.length === 0) {
            throw new Error('Usuario Invalido', error)
        }

        const user = users[0]

        const isValid = await bcrypt.compare(pin, user.pin)

        if (!isValid) throw new Error('Pin Incorrecto')
        
        return ('Pin Correcto')

    }

    static delete = async ({ id }) => {
        const [user] = await conn.query('DELETE FROM usuario WHERE id = ?', [id])
        console.log(user)
        if (user.affectedRows === 0) {
            throw new Error('Error al eliminar el usuario')
        }
        return ('Usuario eliminado')

    }
}

import { validateUser, validatePartialUser } from "../schemas/validateUsers.js";
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from "../config.js";


export class UserController {
    constructor({ userModel }) {
        this.userModel = userModel
    }
    getAll = async (req, res) => {
        const allUsers = await this.userModel.getAll()
        res.json(allUsers)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const user = await this.userModel.getById({ id })
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }
        res.json(user)
    }


    create = async (req, res) => {

        const user = validateUser(req.body)

        if (user.error) {
            return res.status(400).json({ error: JSON.parse(user.error.message) })
        }

        const newUser = await this.userModel.create({ userData: user.data })

        res.status(201).send(newUser)
    }

    login = async (req, res) => {
        const user = validatePartialUser(req.body)

        if (user.error) {
            return res.status(400).json({ error: JSON.parse(user.error.message) })
        }

        const loggedUser = await this.userModel.login({ userData: user.data })
        const token = jwt.sign({ id: loggedUser[0].id, name: loggedUser[0].name, email: loggedUser[0].email, password: loggedUser[0].password, pin: loggedUser[0].pin },
            SECRET_JWT_KEY, {
            expiresIn: '12h'
        })
        res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            })
            .send({ message: 'Inicio de sesión exitoso', token })


        if (loggedUser.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' })

        }
        res.status(200).json({ message: 'Inicio de sesión exitoso', token })

    }

    getMe = (req, res) => {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).json({ message: 'No se proporcionó un token de autenticación' })
        }
        try {
            const decoded = jwt.verify(token, SECRET_JWT_KEY)
            res.status(200).json({ id: decoded.id, name: decoded.name, email: decoded.email, password: decoded.password, pin: decoded.pin })

        } catch (error) {
            return res.status(401).json({ message: 'Token de autenticación inválido' })
        }

    }
    getOut = (req, res) => {
        res.clearCookie('access_token')
        res.status(200).json({ message: 'Sesión cerrada exitosamente' })
    }

    update = async (req, res) => {
        const user = validatePartialUser(req.body)
        if (user.error) {
            return res.status(400).json({ error: JSON.parse(user.error.message) })
        }
        const { id } = req.params

        const UpdatedUser = await this.userModel.update({ id, userData: user.data })

        res.status(200).json(UpdatedUser)

    }

    recover = async (req,res) =>{
        const user = validatePartialUser(req.body)

        if(user.error){
            return res.status(400).json({ error: JSON.parse(user.error.message) })
        }
        const recovery = await this.userModel.recovery({ userData: user.data})
        if(recovery.length === 0){
            return res.status(400).json({ message: 'Credenciales Incorrectas' })
        }
        res.status(200).json({ message: 'Contraseña Actualizada' })

    }

    pinReview = async (req, res) =>{
        const user = validatePartialUser(req.body)

        if (user.error) {
            return res.status(400).json({ error: JSON.parse(user.error.message) })
        }

        const pinChecked = await this.userModel.pinReview({ userData: user.data })

        if (pinChecked.length === 0) {
            return res.status(401).json({ message: 'Pin inválido' })

        }
        res.status(200).json({ message: 'Pin Verificado' })

    }

    delete = async (req, res) => {
        const { id } = req.params

        const DeletedUser = await this.userModel.delete({ id })

        if (!DeletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.status(204).json({ message: 'Usuario eliminado' })

    }
}
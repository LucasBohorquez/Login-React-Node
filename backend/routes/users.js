import { Router } from "express";
import { UserController } from "../controllers/users.js";
import { verifyToken } from "../middlewares/authmiddlewares.js";


export const createUsersRouter = ({ userModel }) => {

    const Usersrouter = Router()

    const userController = new UserController({ userModel })


    Usersrouter.get('/Users', userController.getAll)

    Usersrouter.post('/Register', userController.create)

    Usersrouter.post('/Login', userController.login)

    Usersrouter.get('/me', verifyToken, userController.getMe)

    Usersrouter.post('/Logout', userController.getOut)

    Usersrouter.get('/User/:id', userController.getById)

    Usersrouter.patch('/User/:id', userController.update)

    Usersrouter.patch('/Recover', userController.recover)

    Usersrouter.post('/Pin', userController.pinReview)

    Usersrouter.delete('/User/:id', userController.delete)

    return Usersrouter
}

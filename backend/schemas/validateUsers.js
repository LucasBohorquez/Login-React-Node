import z from 'zod'

const UserSchema = z.object({
        name: z.string().min(3, {
            message: 'El nombre es requerido'
        }),
        email: z.string().email({
            message: 'El email no es válido'
        }),
        password: z.string().min(6, {
            message: 'La contraseña debe tener al menos 6 caracteres'
        }),
        pin: z.string().min(4).max(4,{
            message: 'El pin debe tener al menos 4 caracteres'
        })
    })

    export function validateUser(user){
        return UserSchema.safeParse(user)
    }

    export function validatePartialUser(user){
        return UserSchema.partial().safeParse(user)
    }

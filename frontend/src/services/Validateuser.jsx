import z from 'zod'

const UserSchema = z.object({
    email: z.string().email({
        message: 'El email no es válido',
        required_error: 'El email es requerido'
    }),
    password: z.string().min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres',
        required_error: 'La contraseña es requerida'
    })
})

export function validateUser(user){
        return UserSchema.safeParse(user)
    }

    export function validatePartialUser(user){
        return UserSchema.partial().safeParse(user)
    }
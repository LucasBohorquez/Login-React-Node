import { users } from "../users.js"


export class UserModel {
    static getAll = async ()=>{
         return users
    }

    static getById = async ({id}) =>{
        const user = users.find(user => user.id === id)
        return user
    }

    static create = async ({userData}) =>{
         const newUser = {
                id: crypto.randomUUID(),
                ...userData
            }
         users.push(newUser)
         return newUser
    }

    static update = async ({id, userData}) =>{
        const userIndex = users.findIndex(user => user.id === id)
            if(userIndex === -1)return false

            const UpdatedUser = {
                ...users[userIndex],
                ...userData
            }
            return UpdatedUser
    }

    static delete = async ({id}) =>{
        const userIndex = users.findIndex(user => user.id === id)
        if(userIndex === -1 ) return false

        users.splice(userIndex, 1)
        return true
    }
}
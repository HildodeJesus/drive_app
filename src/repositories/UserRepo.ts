import { isEmail, isLength } from "validator";
import { User } from "../entities/User";
import { createCustomError } from "../error/CustomError";
import DB from "../database";

export class UserRepo {
  async create(user: Omit<User, "created_at" | "updated_at">){
    const errors = await this.validate(user)
    if(errors.length > 0) throw createCustomError('Temos problema chefia!', 400, errors)

    await DB.table('users').insert(user)
    return
  }

  async getByEmail(email: string) {
    let user: User[] = await DB.table('users').select().where({email: email})
    user = JSON.parse(JSON.stringify(user))

    return user[0]
  }

  async validate(user: Omit<User, "created_at" | "updated_at"> ) {
    let errors = []
    
    if(!user.name) errors.push("Nome inválido!")
    if(!isEmail(user.email)) errors.push("E-mail inválido!")
    if(!isLength(user.password, {min: 6})) errors.push("A senha deve possuir pelo menos 6 caracteres!")

    return errors
  }
}
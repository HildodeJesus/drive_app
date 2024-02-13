import { Request, Response } from "express";
import bcrypt from 'bcrypt'

import { UserRepo } from "../repositories/UserRepo";
import { createCustomError } from "../error/CustomError";

export class LoginController {
  index(req: Request, res: Response) {
    res.render("login")
  }

  async login(req: Request, res: Response) {
    const {email, password} = req.body;

    const user = await new UserRepo().getByEmail(email)
    if(user === undefined) throw createCustomError('Usuário não existe', 400)

    const validatePassword = await bcrypt.compare(password, user.password)

    if(!validatePassword) throw createCustomError("Senha está errada!", 400)
    
    req.session.user = {
      id: user.id,
      email: user.email, 
      name: user.name
    }

    req.session.save(() => res.redirect('/'))
  }

  logout(req: Request, res: Response) {
    req.session.destroy(() => res.redirect("/"))
  }
}
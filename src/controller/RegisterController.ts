import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'

import { UserRepo } from "../repositories/UserRepo";
import { User } from "../entities/User";
import { createCustomError } from "../error/CustomError";

export class RegisterController {
  index(req: Request, res: Response) {
    res.render("register")
  }

  async createAnAccount(req: Request, res: Response, next: NextFunction) {
    try {
       const {name, email, password} = req.body
       const userRepo = new UserRepo()

      const userExists = await userRepo.getByEmail(email)
      if(userExists !== undefined) throw createCustomError('Esse email já está em uso!', 400)

      const hashedPass = await bcrypt.hash(password, 8)

      const newUser = new User({name, email, password: hashedPass})
      await userRepo.create(newUser)

      req.flash('success', 'Usuŕio criado com sucesso!')
      req.session.save(() => res.redirect('/entrar'))
    } catch (error) {
      next(error)
    }
   
  }
}
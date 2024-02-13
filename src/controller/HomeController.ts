import { Request, Response } from "express";

export class HomeController {
  index(req: Request, res: Response) {
    if(!req.session.user) return res.redirect("/entrar")
    return res.render("home")
  }
}
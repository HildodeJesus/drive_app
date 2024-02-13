import { Request, Response } from "express";

export class HomeController {
  index(req: Request, res: Response) {
    return res.render("home")
  }
}
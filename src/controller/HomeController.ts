import { Request, Response } from "express";
import { FileRepo } from "../repositories/FileRepo";

export class HomeController {
  index(req: Request, res: Response) {
    const files = new FileRepo().getByUser(req.session.user.id)
    return res.render("home", {
      files
    })
  }
}
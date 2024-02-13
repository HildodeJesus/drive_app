import { NextFunction, Request, Response } from "express";

export default function auth(req: Request, res: Response, next: NextFunction) {
  if(!req.session.user) {
    req.flash('errors', ['Entre em alguma conta antes'])
    req.session.save(() => res.redirect('/entrar'))
    return
  }

  next()
}
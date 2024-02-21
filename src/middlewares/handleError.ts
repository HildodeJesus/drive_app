import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../error/CustomError";

export default function handleError(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if(process.env.NODE_ENV !== "production") console.log(err);
  
  if(err instanceof CustomError) {
    req.flash('errors', err.errors ? err.errors: [err.message])
    req.session.save(() => res.redirect("back"))
    return
  }

  return res.render("error", {
    msg: "Algum erro aconteceu, tente novamente",
    statusCode: 500
  })
}


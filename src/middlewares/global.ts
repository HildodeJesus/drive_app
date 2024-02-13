import { NextFunction, Request, Response } from "express";

function globalVariables(req: Request, res: Response, next: NextFunction) {
  res.locals.errors = req.flash("errors");
	res.locals.success = req.flash("success");
	res.locals.user = req.session.user;

  next()
}

export default globalVariables
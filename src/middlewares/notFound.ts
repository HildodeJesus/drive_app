import { Request, Response } from "express";

export default function notFound(req: Request, res: Response) {
  res.render('error', {msg: "Essa rota não existe", statusCode: 404});
}
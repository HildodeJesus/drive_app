import "dotenv/config"
import "express-async-errors"

import express, {Express} from "express";
import flash from 'connect-flash';
import session from 'express-session';
import {resolve} from 'path'

import homeRoutes from './routes/homeRoutes'
import loginRoutes from './routes/loginRoutes'
import registerRoutes from './routes/registerRoutes'
import fileRoutes from './routes/fileRoutes'
import globalVariables from "./middlewares/global";
import handleError from "./middlewares/handleError";
import notFound from "./middlewares/notFound";


const sessionConfig = session({
  secret: process.env.SECRET_SESSION as string,
  resave: false,
  saveUninitialized:false,
  cookie: {maxAge: 1000 *60 *60 *3, httpOnly: true}
}) 

export class App {
  public server: Express;

  constructor() {
    this.server = express()
    this.middleware()
    this.routes()
  }

  private middleware() {
    this.server.use(express.urlencoded({extended: false}))
    this.server.use(express.json())
    this.server.use(sessionConfig)
    this.server.use(flash())
    this.server.set("view engine", 'ejs')
    this.server.set('views', resolve(__dirname, "views"))
    this.server.use(express.static("public"))
    this.server.use(globalVariables)
    
  }

  private routes() {
    this.server.use(homeRoutes)
    this.server.use(loginRoutes)
    this.server.use(registerRoutes)
    this.server.use(fileRoutes)
    this.server.use(handleError)
    this.server.use(notFound)
  }
}


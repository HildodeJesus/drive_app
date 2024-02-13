import { Router } from "express";

import { LoginController } from "../controller/LoginController";
const loginController = new LoginController()

const router = Router()

router.get("/entrar", loginController.index)
router.post("/server/login", loginController.login)
router.get("/server/logout", loginController.logout)

export default router
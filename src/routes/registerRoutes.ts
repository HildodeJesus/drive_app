import { Router } from "express";

import { RegisterController } from "../controller/RegisterController";
const registerController = new RegisterController()

const router = Router()

router.get("/cadastrar", registerController.index)
router.post('/server/register', registerController.createAnAccount)

export default router
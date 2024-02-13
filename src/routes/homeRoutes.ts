import { Router } from "express";

import { HomeController } from "../controller/HomeController";
import auth from "../middlewares/auth";

const homeController = new HomeController()
const router = Router()

router.get("/", auth, homeController.index)

export default router
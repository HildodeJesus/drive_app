import { Router } from "express";

import { HomeController } from "../controller/HomeController";
const homeController = new HomeController()
const router = Router()

router.get("/", homeController.index)

export default router
import { Router } from "express";

import { FileController } from "../controller/FileController";
import auth from "../middlewares/auth";

const fileController = new FileController()
const router = Router()

router.get("/sign-s3", auth, fileController.getSignedS3Url)

export default router
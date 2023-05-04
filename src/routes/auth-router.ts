import { Router } from "express"
import makeCallback from "../controllers/express-callback"
import AuthController from "../controllers/auth"
import { authMiddleware } from "../middlewares"

export const router = Router()

router.post("/register", makeCallback(AuthController.postRegisterUser))
router.post("/login", makeCallback(AuthController.getLoginUser))
router.delete("/user/:id", authMiddleware, makeCallback(AuthController.deleteUser))
router.patch(
	"/change-password/:id",
	authMiddleware,
	makeCallback(AuthController.patchChangePassword)
)
router.patch("/change-email/:id", authMiddleware, makeCallback(AuthController.patchChangeEmail))

import { Router } from "express"
import makeCallback from "../controllers/express-callback"
import UsersController from "../controllers/users"

export const router = Router()

router.patch("/change-name/:id", makeCallback(UsersController.patchChangeName))
router.get("/get-user/:id", makeCallback(UsersController.getGetUser))

import { Router } from "express"
import makeCallback from "../../middlewares/express-callback"
import { postUser } from "./controllers"

export const router = Router()

router.post("/", makeCallback(postUser))

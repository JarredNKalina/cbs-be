import { Router } from "express"
import makeCallback from "../../middlewares/express-callback"
import { getAllServices } from "./controllers"

export const router = Router()

router.get("/", makeCallback(getAllServices))

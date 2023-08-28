import { Router } from "express"
import { postCustomer } from "./controllers"
import makeCallback from "../../middlewares/express-callback"

export const router = Router()

router.post("/", makeCallback(postCustomer))

import { Router } from "express"
import makeCallback from "../../middlewares/express-callback"
import { getAllBarbers } from "./controllers"
export const router = Router()

router.get("/", makeCallback(getAllBarbers))

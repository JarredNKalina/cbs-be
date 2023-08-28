import { Router } from "express"
import makeCallback from "../../middlewares/express-callback"
import { getLoyaltyByUserId } from "./controllers"

export const router = Router()

router.get("/:userId", makeCallback(getLoyaltyByUserId))

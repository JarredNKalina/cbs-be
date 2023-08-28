import { Router } from "express"
import makeCallback from "../../middlewares/express-callback"
import { getAllUserBookings, getAvailability, postBooking } from "./controllers"

export const router = Router()

router.get("/:userId", makeCallback(getAllUserBookings))
router.get("/:serviceId", makeCallback(getAvailability))
router.post("/", makeCallback(postBooking))

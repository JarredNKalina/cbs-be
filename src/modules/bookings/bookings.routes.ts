import { Router } from "express"
import makeCallback from "../../middlewares/express-callback"
import {
	getAllUserBookings,
	getAvailability,
	postBooking,
	getAllBookingProfiles,
} from "./controllers"

export const router = Router()

router.get("/:userId", makeCallback(getAllUserBookings))
router.get("/:serviceId/availability", makeCallback(getAvailability))
router.post("/", makeCallback(postBooking))
router.get("/", makeCallback(getAllBookingProfiles))

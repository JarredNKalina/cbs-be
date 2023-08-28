import { Router } from "express"

const routes = Router()

import { router as customersRouter } from "../modules/customers/customers.routes"
import { router as usersRouter } from "../modules/users/users.routes"
import { router as bookingsRouter } from "../modules/bookings/bookings.routes"
import { router as servicesRouter } from "../modules/services/services.routes"
import { router as barbersRouter } from "../modules/barbers/barbers.routes"
import { router as loyaltyRouter } from "../modules/loyalty/loyalty.routes"

routes.use("/customers", customersRouter)
routes.use("/users", usersRouter)
routes.use("/bookings", bookingsRouter)
routes.use("/services", servicesRouter)
routes.use("/barbers", barbersRouter)
routes.use("/loyalty", loyaltyRouter)

export default routes

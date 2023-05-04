import { Router } from "express"
import { authMiddleware } from "../middlewares"
import { router as usersRouter } from "./users-router"

const routes = Router()

routes.use("/users", authMiddleware, usersRouter)

export default routes

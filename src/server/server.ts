import express from "express"
import { routes } from "../routes"
import { applyMiddleware } from "../middlewares"

const app = express()
applyMiddleware(app)
app.use("/api/v1", routes)

export default app

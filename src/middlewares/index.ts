import cookie from "cookie"
import jwt from "jsonwebtoken"

import makeAuthMiddleware from "./auth-middleware"

import { usersDb } from "../data-access"

export { applyMiddleware } from "./apply-middleware"

export const authMiddleware = makeAuthMiddleware({ cookie, jwt, usersDb })


import { env } from "process"
import { Response, NextFunction } from "express"
import { AuthDecodedToken } from "../@types/auth"
import { ExpressRequestWithToken } from "../@types/http"
import cookie from "cookie"
import jwt from "jsonwebtoken"
import { UsersDb } from "../data-access"

type MakeAuthMiddleware = {
	cookie: typeof cookie
	jwt: typeof jwt
	usersDb: UsersDb
}

export default function makeAuthMiddleware({ cookie, jwt, usersDb }: MakeAuthMiddleware) {
	return async function authMiddleware(
		req: ExpressRequestWithToken,
		res: Response,
		next: NextFunction
	) {
		try {
			if (req.headers.cookie) {
				const cookies = cookie.parse(req.headers.cookie)
				const nextAuthCookieName =
					env.NODE_ENV === "development"
						? "next-auth.session-token"
						: "__Secure-next-auth.session-token"
				const nextAuthSessionToken = cookies[nextAuthCookieName]

				if (!nextAuthSessionToken) throw new Error("No auth token provided!")

				const decodedToken = (await jwt.verify(nextAuthSessionToken, env.NEXTAUTH_SECRET!, {
					algorithms: ["HS256"],
				})) as AuthDecodedToken

				const user = await usersDb.findById(decodedToken.user.id)

				if (!user) {
					Object.keys(cookies).forEach(cookieName => res.clearCookie(cookieName))

					throw new Error("Invalid authenticated user!")
				}

				req.decodedToken = decodedToken

				next()
			} else {
				throw new Error("No authentication cookie provided!")
			}
		} catch (error) {
			if (error instanceof Error) {
				return res.status(401).send({ error: error.message })
			}
		}
	}
}

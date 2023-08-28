import { ExpressRequestWithToken } from "../@types/http"
import * as admin from "firebase-admin"
import { NextFunction, Response } from "express"

async function decodeToken(req: ExpressRequestWithToken, res: Response, next: NextFunction) {
	try {
		const headerToken = req.headers.authorization
		if (!headerToken) {
			return res.send({ message: "No token provided" }).status(401)
		}

		if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
			res.send({ message: "Invalid token" }).status(401)
		}

		const token = headerToken.split(" ")[1]

		admin
			.auth()
			.verifyIdToken(token)
			.then(() => next())
			.catch(() => res.send({ message: "Could not authorize" }).status(403))
	} catch (error) {
		if (error instanceof Error) {
			return res.status(401).send({ error: error.message })
		}
	}
}
export { decodeToken }

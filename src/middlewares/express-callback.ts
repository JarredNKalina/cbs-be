import { Response } from "express"
import { ExpressRequestWithToken, HttpRequest, HttpResponse } from "../@types/http"

type Controller = (httpRequest: HttpRequest) => Promise<HttpResponse | undefined>

export default function makeExpressCallback(controller: Controller) {
	return function expressCallback(req: ExpressRequestWithToken, res: Response) {
		const httpRequest: HttpRequest = {
			body: req.body,
			query: req.query,
			params: req.params,
			ip: req.ip,
			method: req.method,
			path: req.path,
			headers: req.headers,
			cookies: req.headers.cookie,
			decodedToken: req.decodedToken,
			files: req.files,
			file: req.file,
		}
		if (req.path.includes("login")) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...rest } = req.body
			console.log({
				path: `${req.baseUrl}${req.path}`,
				method: req.method,
				body: rest,
			})
		} else {
			console.log({
				path: `${req.baseUrl}${req.path}`,
				method: req.method,
				body: req.body,
			})
		}

		controller(httpRequest)
			.then((httpResponse: HttpResponse | undefined) => {
				if (httpResponse !== undefined) {
					if (httpResponse.headers) {
						res.set(httpResponse.headers)
					}
					res.type("json")
					res.status(httpResponse.statusCode).send(httpResponse.body)
				}
			})
			.catch(() => res.status(500).send({ error: "An unkown error occurred." }))
	}
}

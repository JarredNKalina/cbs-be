import { HttpRequest, HttpResponse } from "../../../@types/http"
import { createUser } from "../services"

export async function postUser(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
	const credentials = httpRequest.body
	try {
		const user = await createUser(credentials)

		return {
			headers: { "Content-Type": "application/json" },
			statusCode: 201,
			body: { user },
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.message === `User with email "${credentials.email}" already exists!`) {
				return {
					headers: { "Content-Type": "application/json" },
					statusCode: 400,
					body: { error: error.message, type: "existing-user" },
				}
			}

			return {
				headers: { "Content-Type": "application/json" },
				statusCode: 400,
				body: { error: error.message },
			}
		}
	}
}

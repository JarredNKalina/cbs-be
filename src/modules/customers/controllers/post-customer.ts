import { HttpRequest, HttpResponse } from "../../../@types/http"
import { createCustomer } from "../services"

export async function postCustomer(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
	try {
		const body = httpRequest.body

		const id = await createCustomer(body)

		return {
			headers: { "Content-Type": "application/json" },
			statusCode: 201,
			body: { id },
		}
	} catch (error) {
		if (error instanceof Error) {
			return {
				headers: { "Content-Type": "application/json" },
				statusCode: 400,
				body: { error: error.message },
			}
		}
	}
}

import { HttpRequest, HttpResponse } from "../../../@types/http"
import { createBooking } from "../services"

export async function postBooking(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
	try {
		const body = httpRequest.body

		await createBooking(body)

		return {
			headers: { "Content-Type": "application/json" },
			statusCode: 201,
			body: { message: "success" },
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

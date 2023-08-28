import { HttpRequest, HttpResponse } from "../../../@types/http"
import { retrieveAllUserBookings } from "../services"

export async function getAllUserBookings(
	httpRequest: HttpRequest
): Promise<HttpResponse | undefined> {
	try {
		const { userId } = httpRequest.params

		const body = await retrieveAllUserBookings(userId)

		return {
			headers: { "Content-Type": "application/json" },
			statusCode: 201,
			body,
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

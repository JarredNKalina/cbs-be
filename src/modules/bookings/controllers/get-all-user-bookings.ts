import { HttpRequest, HttpResponse } from "../../../@types/http"
import { retrieveAllUserBookings } from "../services"

export async function getAllUserBookings(
	httpRequest: HttpRequest
): Promise<HttpResponse | undefined> {
	try {
		const { userId } = httpRequest.params
		const { days } = httpRequest.query
		if (Number(days) > 31 || Number(days) < -31) {
			throw new Error(
				"Days must be a number within a string, less between 31 and -31 inclusive"
			)
		}
		const body = await retrieveAllUserBookings(userId, Number(days))

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

import { HttpRequest, HttpResponse } from "../../../@types/http"
import { retrieveLoyaltyByUserId } from "../services"

export async function getLoyaltyByUserId(
	httpRequest: HttpRequest
): Promise<HttpResponse | undefined> {
	try {
		const { userId } = httpRequest.params

		const body = await retrieveLoyaltyByUserId(userId)

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

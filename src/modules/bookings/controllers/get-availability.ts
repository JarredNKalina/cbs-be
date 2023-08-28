import { HttpRequest, HttpResponse } from "../../../@types/http"
import { retrieveAvailability } from "../services"

export async function getAvailability(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
	try {
		const { serviceId } = httpRequest.params
		const { teamMemberId } = httpRequest.query

		if (teamMemberId && typeof teamMemberId !== "string")
			throw new Error("teamMemberId must be a string")

		const body = await retrieveAvailability(serviceId, teamMemberId)

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

import { HttpResponse } from "../../../@types/http"
import { retrieveAllBookingProfiles } from "../services"

export async function getAllBookingProfiles(): Promise<HttpResponse | undefined> {
	try {
		const body = await retrieveAllBookingProfiles()

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

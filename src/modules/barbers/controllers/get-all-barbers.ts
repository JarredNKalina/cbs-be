import { HttpResponse } from "../../../@types/http"
import { retrieveAllBarbers } from "../services/retrieve-all-barbers"

export async function getAllBarbers(): Promise<HttpResponse | undefined> {
	try {
		const body = await retrieveAllBarbers()

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

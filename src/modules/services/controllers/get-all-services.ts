import { HttpResponse } from "../../../@types/http"
import { retrieveAllServices } from "../services"

export async function getAllServices(): Promise<HttpResponse | undefined> {
	try {
		const body = await retrieveAllServices()

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

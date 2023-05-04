import { HttpRequest, HttpResponse } from "../../@types/http"
import makeChangeEmail from "../../use-cases/auth/change-email"

type ChangeEmail = {
	changeEmail: ReturnType<typeof makeChangeEmail>
}

export default function makePatchChangeEmail({ changeEmail }: ChangeEmail) {
	return async function patchChangeEmail(
		httpRequest: HttpRequest
	): Promise<HttpResponse | undefined> {
		try {
			const { newEmail } = httpRequest.body
			const { id } = httpRequest.params
			const data = await changeEmail({ id, newEmail })

			return {
				headers: { "Content-Type": "application/json" },
				statusCode: 200,
				body: { data },
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
}

import { HttpRequest, HttpResponse } from "../../@types/http"
import makeChangePassword from "../../use-cases/auth/change-password"

type ChangePassword = {
	changePassword: ReturnType<typeof makeChangePassword>
}

export default function makePatchChangePassword({ changePassword }: ChangePassword) {
	return async function patchChangePassword(
		httpRequest: HttpRequest
	): Promise<HttpResponse | undefined> {
		try {
			const { currentPassword, newPassword } = httpRequest.body
			const { id } = httpRequest.params
			const data = await changePassword({ id, currentPassword, newPassword })

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

import { HttpRequest, HttpResponse } from "../../@types/http"
import makeLoginUser from "../../use-cases/auth/login-user"

type LoginUser = {
	loginUser: ReturnType<typeof makeLoginUser>
}

export default function makeGetLoginUser({ loginUser }: LoginUser) {
	return async function getLoginUser(
		httpRequest: HttpRequest
	): Promise<HttpResponse | undefined> {
		try {
			const userCredentials = httpRequest.body
			const user = await loginUser(userCredentials)

			return {
				headers: { "Content-Type": "application/json" },
				statusCode: 200,
				body: { user },
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

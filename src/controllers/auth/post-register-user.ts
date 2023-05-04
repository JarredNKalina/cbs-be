import { HttpRequest, HttpResponse } from "../../@types/http"
import makeRegisterUser from "../../use-cases/auth/register-user"

type RegisterUser = {
	registerUser: ReturnType<typeof makeRegisterUser>
}
export default function makePostUser({ registerUser }: RegisterUser) {
	return async function postUser(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
		const credentials = httpRequest.body

		try {
			const user = await registerUser(credentials)

			return {
				headers: { "Content-Type": "application/json" },
				statusCode: 201,
				body: { user },
			}
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === `User with email "${credentials.email}" already exists!`) {
					return {
						headers: { "Content-Type": "application/json" },
						statusCode: 400,
						body: { error: error.message, type: "existing-user" },
					}
				}

				return {
					headers: { "Content-Type": "application/json" },
					statusCode: 400,
					body: { error: error.message },
				}
			}
		}
	}
}

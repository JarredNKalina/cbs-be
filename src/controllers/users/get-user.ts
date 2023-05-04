import { HttpResponse, HttpRequest } from "../../@types/http"
import makeGetUser from "../../use-cases/users/get-user"

type MakeGetGetUser = {
	getUser: ReturnType<typeof makeGetUser>
}

export default function makeGetGetUser({ getUser }: MakeGetGetUser) {
	return async function getGetUser(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
		try {
			const { id } = httpRequest.params
			const data = await getUser(id)
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

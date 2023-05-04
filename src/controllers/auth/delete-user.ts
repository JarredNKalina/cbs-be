import { HttpRequest, HttpResponse } from "../../@types/http"
import makeDeleteUserById from "../../use-cases/auth/delete-user-by-id"

type DeleteUser = {
	deleteUserById: ReturnType<typeof makeDeleteUserById>
}

export default function makeDeleteUser({ deleteUserById }: DeleteUser) {
	return async function deleteUser(httpRequest: HttpRequest): Promise<HttpResponse | undefined> {
		try {
			const { id } = httpRequest.params
			const data = await deleteUserById(id)

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

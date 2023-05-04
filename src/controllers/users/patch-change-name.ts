import { HttpRequest, HttpResponse } from "../../@types/http"
import { ChangeNameInput } from "../../@types/auth"
import { User } from "@prisma/client"

type ChangeName = {
	changeName: (
		changeNameInput: ChangeNameInput
	) => Promise<Omit<User, "password" | "createdAt" | "updatedAt">>
}

export default function makePatchChangeName({ changeName }: ChangeName) {
	return async function patchChangePassword(
		httpRequest: HttpRequest
	): Promise<HttpResponse | undefined> {
		try {
			const { newFirstName, newLastName } = httpRequest.body
			const { id } = httpRequest.params
			const data = await changeName({ id, newFirstName, newLastName })

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

import { z } from "zod"
import { UserCreateDTO } from "../../@types/user"
import { userCreateDTOValidator } from "./users.validators"

export function makeUser({ email, firstName, lastName, password, squareId }: UserCreateDTO) {
	try {
		userCreateDTOValidator.parse({
			email,
			firstName,
			lastName,
			password,
			squareId,
		})
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.issues[0].message)
		}
	}
	return Object.freeze({
		getFirstName: () => firstName,
		getLastName: () => lastName,
		getEmail: () => email,
		getPassword: () => password,
		getSquareId: () => squareId,
	})
}

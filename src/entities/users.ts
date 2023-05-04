import { z } from "zod"
import { UserCreateDTO } from "../@types/users"
import { hashPassword } from "../utils/password-handlers"
import { userCreateDTOValidator } from "../validators/users"

export default function buildMakeUser() {
	return function makeUser({ email, firstName, lastName, password }: UserCreateDTO) {
		const userToCreate = {
			email,
			firstName,
			lastName,
			password,
		}
		try {
			userCreateDTOValidator.parse(userToCreate)
		} catch (error) {
			if (error instanceof z.ZodError) {
				throw new Error(error.issues[0].message)
			}
		}

		return Object.freeze({
			getEmail: () => email,
			getPassword: () => hashPassword(password),
			getFirstName: () => firstName,
			getLastName: () => lastName,
			getInitials: () => `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`,
			getFullName: () => `${firstName} ${lastName}`,
		})
	}
}

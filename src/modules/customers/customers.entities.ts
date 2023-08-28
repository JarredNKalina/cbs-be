import { z } from "zod"
import { CustomerCreateDTO } from "../../@types/customer"
import { customerCreateDTOValidator } from "./customers.validators"

export function makeCustomer({ email, firstName, lastName }: CustomerCreateDTO) {
	try {
		customerCreateDTOValidator.parse({
			email,
			firstName,
			lastName,
		})
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.log({ error })
			throw new Error(error.issues[0].message)
		}
	}
	return Object.freeze({
		getFirstName: () => firstName,
		getLastName: () => lastName,
		getEmail: () => email,
	})
}

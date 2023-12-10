import { z } from "zod"
import { CustomerCreateDTO } from "../../@types/customer"
import { customerCreateDTOValidator } from "./customers.validators"

export function makeCustomer({
	firstName,
	lastName,
	phoneNumber,
	createdUserId,
}: CustomerCreateDTO) {
	try {
		customerCreateDTOValidator.parse({
			firstName,
			lastName,
			phoneNumber,
			createdUserId,
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
		getPhoneNumber: () => phoneNumber,
		getCreatedUserId: () => createdUserId,
	})
}

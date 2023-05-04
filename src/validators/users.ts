import { z } from "zod"

export const userCreateDTOValidator = z.object({
	email: z
		.string({ required_error: "Users must have an email" })
		.min(1, "Users must have an email")
		.email("Users must have a valid email"),
	firstName: z
		.string({ required_error: "Users must have a first name" })
		.min(1, "Users must have a first name"),
	lastName: z
		.string({ required_error: "Users must have a last name" })
		.min(1, "Users must have a last name"),
	password: z
		.string({ required_error: "Users must have a password" })
		.min(1, "Users must have a password"),
})

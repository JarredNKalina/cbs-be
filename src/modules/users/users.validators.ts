import { z } from "zod"

export const userCreateDTOValidator = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string(),
	squareId: z.string(),
})

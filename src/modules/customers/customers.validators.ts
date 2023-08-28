import { z } from "zod"

export const customerCreateDTOValidator = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
})

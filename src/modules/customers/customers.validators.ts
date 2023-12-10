import { z } from "zod"
import { phoneNumberRegex } from "../../utils/phoneNumberRegex"

export const customerCreateDTOValidator = z.object({
	firstName: z.string(),
	lastName: z.string(),
	phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number"),
	createdUserId: z.string(),
})

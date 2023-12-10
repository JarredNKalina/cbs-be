import { z } from "zod"

export const bookingCreateDTOValidator = z.object({
	locationId: z.string(),
	startAt: z.string(),
	customerId: z.string(),
	customerNote: z.string().optional(),
	appointmentSegments: z.object({
		teamMemberId: z.string(),
		serviceId: z.string(),
		serviceVariationVersion: z.number(),
	}),
})

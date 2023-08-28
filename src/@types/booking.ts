import { z } from "zod"
import { bookingCreateDTOValidator } from "../modules/bookings/bookings.validators"

export type BookingCreateDTO = z.infer<typeof bookingCreateDTOValidator>

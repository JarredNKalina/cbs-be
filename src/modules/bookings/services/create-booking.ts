import { squareClient } from "../../.."
import { BookingCreateDTO } from "../../../@types/booking"

export async function createBooking(bookingCreateDTO: BookingCreateDTO) {
	try {
		const booking = await squareClient.bookingsApi.createBooking({
			booking: {
				locationId: bookingCreateDTO.locationId,
				startAt: bookingCreateDTO.startAt,
				customerId: bookingCreateDTO.customerId,
				customerNote: bookingCreateDTO.customerNote,
				sellerNote: "Booked via the mobile app",
				appointmentSegments: [
					{
						teamMemberId: bookingCreateDTO.appointmentSegments.teamMemberId,
						durationMinutes: 60,
						serviceVariationId: bookingCreateDTO.appointmentSegments.serviceId,
						serviceVariationVersion: BigInt(
							bookingCreateDTO.appointmentSegments.serviceVariationVersion
						),
					},
				],
			},
		})
		if (!booking.result.booking) throw new Error("Booking not created")
		console.log({ booking: booking.result.booking })
	} catch (err) {
		console.log(err)
	}
}

// Booking.location_id
// Booking.start_at
// Booking.team_member_id
// Booking.AppointmentSegment.service_variation_id
// Booking.AppointmentSegment.service_variation_version

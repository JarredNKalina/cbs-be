import { squareClient } from "../../.."
import { BookingCreateDTO } from "../../../@types/booking"

export async function createBooking(bookingCreateDTO: BookingCreateDTO) {
	const booking = await squareClient.bookingsApi.createBooking({
		booking: {
			locationId: bookingCreateDTO.locationId,
			startAt: bookingCreateDTO.startAt,
			customerId: bookingCreateDTO.customerId,
			customerNote: bookingCreateDTO.customerNote,
			transitionTimeMinutes: 10,
			sellerNote: "Booked via the mobile app",
			status: "PENDING",
			appointmentSegments: [
				{
					teamMemberId: bookingCreateDTO.appointmentSegments.teamMemberId,
					durationMinutes: 50,
					serviceVariationId: bookingCreateDTO.appointmentSegments.serviceId,
				},
			],
		},
	})

	if (!booking.result.booking) throw new Error("Booking not created")

	return booking.result.booking
}

// Booking.location_id
// Booking.start_at
// Booking.team_member_id
// Booking.AppointmentSegment.service_variation_id
// Booking.AppointmentSegment.service_variation_version

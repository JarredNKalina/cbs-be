import { formatRFC3339 } from "date-fns"
import { squareClient } from "../../.."

export async function retrieveAllUserBookings(userId: string, days: number) {
	if (!userId) throw new Error("No user id provided")
	try {
		await squareClient.customersApi.retrieveCustomer(userId)
		let startAtMinRFC: string | undefined
		let startAtMaxRFC: string | undefined
		if (days < 0) {
			const startAtMin = new Date()
			const startAtMinYear = startAtMin.getUTCFullYear()
			const startAtMinMonth = startAtMin.getUTCMonth()
			const startAtMinDay = startAtMin.getUTCDate() + days
			const startAtMinHour = startAtMin.getUTCHours()
			const startAtMinMinute = startAtMin.getUTCMinutes()
			startAtMinRFC = formatRFC3339(
				new Date(
					startAtMinYear,
					startAtMinMonth,
					startAtMinDay,
					startAtMinHour,
					startAtMinMinute
				)
			)
		} else {
			const startAtMax = new Date()
			const startAtMaxYear = startAtMax.getUTCFullYear()
			const startAtMaxMonth = startAtMax.getUTCMonth()
			const startAtMaxDay = startAtMax.getUTCDate() + days
			const startAtMaxHour = startAtMax.getUTCHours()
			const startAtMaxMinute = startAtMax.getUTCMinutes()

			startAtMaxRFC = formatRFC3339(
				new Date(
					startAtMaxYear,
					startAtMaxMonth,
					startAtMaxDay,
					startAtMaxHour,
					startAtMaxMinute
				)
			)
		}

		const bookings = await squareClient.bookingsApi.listBookings(
			10,
			undefined,
			userId,
			undefined,
			undefined,
			startAtMinRFC, //startAtMin
			startAtMaxRFC //startAtMax
		)

		if (!bookings.result.bookings) throw new Error("No bookings found")
		const parsedBookings = await Promise.all(
			bookings.result.bookings.map(async (booking, index) => {
				if (!booking.appointmentSegments) throw new Error("No booking Segments found")
				const parsedAppointmentSegments = await Promise.all(
					booking.appointmentSegments?.map(async segment => {
						if (!segment.serviceVariationId)
							throw new Error("No service variation id found")

						return {
							durationInMinutes: segment.durationMinutes,
							serviceVariationId: segment.serviceVariationId,
							teamMemberId: segment.teamMemberId,
							anyTeamMember: segment.anyTeamMember,
						}
					})
				)
				const { creatorDetails, locationType, source, sellerNote, ...parsedBooking } =
					booking
				if (parsedAppointmentSegments) {
					console.log({ parsedAppointmentSegments })
					return { ...parsedBooking, appointmentInfo: parsedAppointmentSegments[0] }
				} else return { ...parsedBooking }
			})
		)

		const finalBookings = parsedBookings.map(booking => {
			const { appointmentSegments, ...returnBooking } = booking
			return returnBooking
		})
		console.log(finalBookings)

		return { ...finalBookings }
	} catch (e) {
		console.log(e)
		throw new Error("No user with that id found")
	}
}

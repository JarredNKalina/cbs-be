import { squareClient } from "../../.."

export async function retrieveAllUserBookings(userId: string) {
	if (!userId) throw new Error("No user id provided")
	const bookings = await squareClient.bookingsApi.listBookings(10, undefined, userId)

	if (!bookings.result.bookings) throw new Error("No bookings found")
	return bookings.result.bookings
}

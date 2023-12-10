import { squareClient } from "../../.."

export async function retrieveAllBookingProfiles() {
	const bookingProfiles = await squareClient.bookingsApi.listTeamMemberBookingProfiles()

	if (!bookingProfiles.result.teamMemberBookingProfiles) {
		throw new Error("No booking profiles found")
	}

	const bookingProfilesReturn = bookingProfiles.result.teamMemberBookingProfiles

	return bookingProfilesReturn
}

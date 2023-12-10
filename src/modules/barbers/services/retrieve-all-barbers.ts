import { squareClient } from "../../.."

export async function retrieveAllBarbers() {
	const barbers = await squareClient.teamApi.searchTeamMembers({})

	if (!barbers.result.teamMembers) throw new Error("No barbers found")

	const returnBarbers = barbers.result.teamMembers.map(barber => {
		if (!barber) throw new Error("No barbers found")
		const { assignedLocations, ...barberWithoutLocations } = barber
		return barberWithoutLocations
	})
	return returnBarbers
}

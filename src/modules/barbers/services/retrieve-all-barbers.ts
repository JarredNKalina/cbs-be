import { squareClient } from "../../.."

export async function retrieveAllBarbers() {
	const barbers = await squareClient.teamApi.searchTeamMembers({})

	if (!barbers.result.teamMembers) throw new Error("No barbers found")

	return barbers.result.teamMembers
}

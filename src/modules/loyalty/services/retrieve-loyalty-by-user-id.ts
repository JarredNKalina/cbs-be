import { squareClient } from "../../.."

export async function retrieveLoyaltyByUserId(userId: string) {
	if (!userId) throw new Error("No user id provided")

	const loyalty = await squareClient.loyaltyApi.searchLoyaltyAccounts({
		query: { customerIds: [userId] },
	})

	const loyaltyAccounts = loyalty.result.loyaltyAccounts
	if (!loyaltyAccounts) throw new Error("No loyalty found")

	return loyaltyAccounts[0]
}

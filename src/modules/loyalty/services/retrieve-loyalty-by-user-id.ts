import { squareClient } from "../../.."

export async function retrieveLoyaltyByUserId(userId: string) {
	if (!userId) throw new Error("No user id provided")
	try {
		await squareClient.customersApi.retrieveCustomer(userId)
	} catch (e) {
		console.log(e)
		throw new Error("No user with that id found")
	}

	const loyalty = await squareClient.loyaltyApi.searchLoyaltyAccounts({
		query: { customerIds: [userId] },
	})

	const programRes = await squareClient.loyaltyApi.retrieveLoyaltyProgram("main")

	const loyaltyAccounts = loyalty.result.loyaltyAccounts
	const program = programRes.result.program
	if (!loyaltyAccounts || !program) throw new Error("No loyalty found")

	const rewardTiers = program.rewardTiers
	if (!rewardTiers) throw new Error("No reward tiers found")

	const parsedRewardTiers = rewardTiers.map(tier => {
		const { pricingRuleReference, ...tierWithoutVersion } = tier
		return tierWithoutVersion
	})
	const { mapping, ...parsedLoyaltyAccount } = loyaltyAccounts[0]
	const loyaltyReturn = { ...parsedLoyaltyAccount, rewardTiers: parsedRewardTiers }

	return loyaltyReturn
}

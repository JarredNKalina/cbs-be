import { nanoid } from "nanoid"
import { squareClient } from "../../.."
import { CustomerCreateDTO } from "../../../@types/customer"
import { makeCustomer } from "../customers.entities"

export async function createCustomer(customerCreateDTO: CustomerCreateDTO) {
	console.log({ customerCreateDTO })
	const customerDTO = makeCustomer(customerCreateDTO)
	try {
		const squareCustomerResponse = await squareClient.customersApi.createCustomer({
			emailAddress: customerDTO.getEmail(),
			familyName: customerDTO.getLastName(),
			givenName: customerDTO.getFirstName(),
		})

		const customer = squareCustomerResponse.result.customer
		if (!customer) throw new Error("Error creating square customer")

		const currentLoyaltyProgram = await squareClient.loyaltyApi.retrieveLoyaltyProgram("main")
		if (!currentLoyaltyProgram.result.program?.id)
			throw new Error("Error finding square loyalty program")

		const loyaltyAccount = await squareClient.loyaltyApi.createLoyaltyAccount({
			idempotencyKey: nanoid(8),
			loyaltyAccount: {
				programId: currentLoyaltyProgram.result.program?.id,
				customerId: customer.id,
			},
		})

		console.log({ loyaltyAccount: loyaltyAccount.result.loyaltyAccount })
		const { version, ...returnCustomer } = customer

		return returnCustomer.id
	} catch (error) {
		throw new Error("Error creating square customer")
	}
}

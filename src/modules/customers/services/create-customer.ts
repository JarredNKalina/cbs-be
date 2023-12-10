import { nanoid } from "nanoid"
import { squareClient } from "../../.."
import { CustomerCreateDTO } from "../../../@types/customer"
import { makeCustomer } from "../customers.entities"
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber"
import clerk from "@clerk/clerk-sdk-node"

export async function createCustomer(customerCreateDTO: CustomerCreateDTO) {
	const customerDTO = makeCustomer(customerCreateDTO)
	try {
		//TODO:
		//before creating a customer
		//check if there is any customer with the same email
		//or if there is a customer with the same phone number
		//if there is, just connect to the clerk user.
		const squareCustomerResponse = await squareClient.customersApi.createCustomer({
			familyName: customerDTO.getLastName(),
			givenName: customerDTO.getFirstName(),
			phoneNumber: formatPhoneNumber(customerDTO.getPhoneNumber()),
		})

		const customer = squareCustomerResponse.result.customer

		if (!customer) throw new Error("Error creating square customer")
		const currentLoyaltyProgram = await squareClient.loyaltyApi.retrieveLoyaltyProgram("main")
		if (!currentLoyaltyProgram.result.program?.id)
			throw new Error("Error finding square loyalty program")

		await squareClient.loyaltyApi.createLoyaltyAccount({
			idempotencyKey: nanoid(8),
			loyaltyAccount: {
				programId: currentLoyaltyProgram.result.program?.id,
				customerId: customer.id,
				mapping: { phoneNumber: customer.phoneNumber },
			},
		})
		const { version, ...returnCustomer } = customer

		await clerk.users.updateUser(customerDTO.getCreatedUserId(), {
			publicMetadata: { squareCustomerId: customer.id },
		})

		return returnCustomer.id
	} catch (error) {
		console.log({ error })
		throw new Error("Error creating square customer")
	}
}

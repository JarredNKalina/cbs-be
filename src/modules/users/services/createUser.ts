import { UserCreateDTO } from "../../../@types/user"
import { makeUser } from "../users.entites"
import { auth } from "firebase-admin"

export async function createUser(userCreateInput: UserCreateDTO) {
	console.log({ userCreateInput })
	const user = makeUser(userCreateInput)
	const insertedUser = await auth().createUser({
		uid: user.getSquareId(),
		password: user.getPassword(),
		email: user.getEmail(),
		displayName: `${user.getFirstName()} ${user.getLastName()}`,
		disabled: false,
	})
	const { providerData, ...returnUser } = insertedUser
	console.log({ returnUser })
	await auth().generateEmailVerificationLink(user.getEmail())
	return returnUser
}

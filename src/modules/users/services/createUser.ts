import { UserCreateDTO } from "../../../@types/user"
import { makeUser } from "../users.entites"
import { auth } from "firebase-admin"

export async function createUser(userCreateInput: UserCreateDTO) {
	const user = makeUser(userCreateInput)
	const insertedUser = await auth().createUser({
		uid: user.getSquareId(),
		password: user.getPassword(),
		email: user.getEmail(),
		displayName: `${user.getFirstName()} ${user.getLastName()}`,
	})

	const { providerData, ...returnUser } = insertedUser
	return returnUser
}

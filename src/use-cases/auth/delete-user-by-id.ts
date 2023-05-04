import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"

type MakeDeleteUser = { usersDb: UsersDb }

export default function makeDeleteUserById({ usersDb }: MakeDeleteUser) {
	return async function deleteUserById(id: string) {
		const user = await usersDb.findById(id)
		if (!user) {
			throw new Error(`User with given id doesn't exist!`)
		}

		const deletedUser = await usersDb.deleteUser(id)

		const filteredUser = exclude(deletedUser, "password", "createdAt", "updatedAt")
		return filteredUser
	}
}

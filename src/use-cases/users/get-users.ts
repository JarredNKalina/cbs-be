import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"

type MakeGetUsers = { usersDb: UsersDb }
export default function makeGetUsers({ usersDb }: MakeGetUsers) {
	return async function getUsers() {
		const users = await usersDb.findMany()
		if (!users) throw new Error("User not found ")

		const filteredUsers = users.map(user => exclude(user, "password"))

		return filteredUsers
	}
}

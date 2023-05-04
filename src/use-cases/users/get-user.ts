import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"

type MakeGetUser = {
	usersDb: UsersDb
}

export default function makeGetUser({ usersDb }: MakeGetUser) {
	return async function getUser(userId: string) {
		const user = await usersDb.findById(userId)
		if (!user) throw new Error("User not found ")

		const filteredUser = exclude(user, "password")

		return filteredUser
	}
}

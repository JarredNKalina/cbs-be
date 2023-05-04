import { LoginUserInput } from "../../@types/auth"
import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"
import { matchPassword } from "../../utils/password-handlers"

type MakeLoginUser = { usersDb: UsersDb }

export default function makeLoginUser({ usersDb }: MakeLoginUser) {
	return async function loginUser({ email, password }: LoginUserInput) {
		if (!email) throw new Error("Email is required")
		if (!password) throw new Error("Password is required")

		const user = await usersDb.findByEmail(email)
		if (!user) {
			throw new Error(`User "${email}" doesn't exist!, please check credentials`)
		}

		if (!matchPassword(password, user.password)) {
			throw new Error(`Invalid password, please check credentials`)
		}

		const loggedUser = exclude(user, "password", "createdAt", "updatedAt")
		return loggedUser
	}
}

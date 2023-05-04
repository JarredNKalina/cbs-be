import { ChangeEmailInput } from "../../@types/auth"
import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"
import { emailRegex } from "../../utils/regex"

type MakeChangeEmail = { usersDb: UsersDb }

export default function makeChangeEmail({ usersDb }: MakeChangeEmail) {
	return async function changeEmail({ id, newEmail }: ChangeEmailInput) {
		const user = await usersDb.findById(id)
		if (!newEmail.match(emailRegex)) throw new Error("New email must be a valid email address")
		if (user?.email === newEmail) throw new Error("New email cannot match current email")
		if (!id) throw new Error("User id is required")

		if (!user) {
			throw new Error(`User with the provided id doesn't exist`)
		}

		const updatedUser = await usersDb.update({
			where: { id },
			data: { email: newEmail },
		})

		const filteredUser = exclude(updatedUser, "password", "createdAt", "updatedAt")

		return filteredUser
	}
}

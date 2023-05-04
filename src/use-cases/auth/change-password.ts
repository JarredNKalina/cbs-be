import { ChangePasswordInput } from "../../@types/auth"
import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"
import { hashPassword, matchPassword } from "../../utils/password-handlers"

type MakeChangePassword = { usersDb: UsersDb }

export default function makeChangePassword({ usersDb }: MakeChangePassword) {
	return async function changePassword({
		id,
		currentPassword,
		newPassword,
	}: ChangePasswordInput) {
		if (!currentPassword) throw new Error("Current password is required")
		if (!newPassword) throw new Error("New password is required")
		if (!id) throw new Error("User id is required")
		if (currentPassword === newPassword) throw new Error("Password must be new")

		const user = await usersDb.findById(id)
		if (!user) {
			throw new Error(`User with the provided id doesn't exist`)
		}

		if (!matchPassword(currentPassword, user.password)) {
			throw new Error(`Invalid password, please check credentials`)
		}

		const updatedUser = await usersDb.update({
			where: { id },
			data: { password: hashPassword(newPassword) },
		})

		const filteredUser = exclude(updatedUser, "password", "createdAt", "updatedAt")
		return filteredUser
	}
}

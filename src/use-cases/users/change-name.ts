import { ChangeNameInput } from "../../@types/auth"
import { UsersDb } from "../../data-access"
import { exclude } from "../../utils/exclude"

type MakeChangeName = { usersDb: UsersDb }

export default function makeChangeName({ usersDb }: MakeChangeName) {
	return async function changeEmail({ id, newFirstName, newLastName }: ChangeNameInput) {
		const user = await usersDb.findById(id)
		if (!newFirstName) throw new Error("First name is required")
		if (!newLastName) throw new Error("Last name is required")
		if (!id) throw new Error("User id is required")

		if (!user) {
			throw new Error(`User with the provided id doesn't exist`)
		}
		const newInitials = `${newFirstName[0].toUpperCase()}${newLastName[0].toUpperCase()}`

		const updatedUser = await usersDb.update({
			where: { id },
			data: { firstName: newFirstName, lastName: newLastName, initials: newInitials },
		})

		const filteredUser = exclude(updatedUser, "password", "createdAt", "updatedAt")

		return filteredUser
	}
}

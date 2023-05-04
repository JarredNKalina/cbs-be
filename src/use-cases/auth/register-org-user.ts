import { Prisma } from "@prisma/client"
import { UserCreateDTO } from "../../@types/users"
import { UsersDb } from "../../data-access"
import { makeUser } from "../../entities"
import { exclude } from "../../utils/exclude"

type MakeRegisterUser = { usersDb: UsersDb }

export default function makeRegisterUser({ usersDb }: MakeRegisterUser) {
	return async function registerUser(userCreateInput: UserCreateDTO) {
		const user = makeUser(userCreateInput)
		const exists = await usersDb.findByEmail(user.getEmail())
		if (exists) {
			throw new Error(`User with email "${user.getEmail()}" already exists!`)
		}

		const userToBeInserted: Prisma.UserCreateInput = {
			email: user.getEmail(),
			firstName: user.getFirstName(),
			lastName: user.getLastName(),
			initials: user.getInitials(),
			password: user.getPassword(),
		}

		const insertedUser = await usersDb.create({
			data: userToBeInserted,
		})

		const newUser = exclude(insertedUser, "password", "createdAt", "updatedAt")
		return newUser
	}
}

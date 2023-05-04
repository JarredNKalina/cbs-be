import { z } from "zod"
import { UsersDb } from "../data-access"
import { userCreateDTOValidator } from "../validators/users"

export type UserCreateDTO = z.infer<typeof userCreateDTOValidator>

export type WithUsersDb = {
	usersDb: UsersDb
}

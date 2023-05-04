import { usersDb } from "../../data-access"
import makeChangeName from "./change-name"
import makeGetUser from "./get-user"
import makeGetUsers from "./get-users"

const getUsers = makeGetUsers({ usersDb })
const changeName = makeChangeName({ usersDb })
const getUser = makeGetUser({ usersDb })

const UsersService = Object.freeze({
	getUsers,
	changeName,
	getUser,
})

export default UsersService
export { getUsers, changeName, getUser }

import { usersDb } from "../../data-access"
import makeChangeEmail from "./change-email"
import makeChangePassword from "./change-password"
import makeDeleteUserById from "./delete-user-by-id"
import makeLoginUser from "./login-user"
import makeRegisterUser from "./register-user"

const registerUser = makeRegisterUser({ usersDb })
const loginUser = makeLoginUser({ usersDb })
const changePassword = makeChangePassword({ usersDb })
const deleteUserById = makeDeleteUserById({ usersDb })
const changeEmail = makeChangeEmail({ usersDb })

const AuthService = Object.freeze({
	registerUser,
	loginUser,
	changePassword,
	deleteUserById,
	changeEmail,
})

export default AuthService
export { registerUser, loginUser, changePassword, deleteUserById, changeEmail }

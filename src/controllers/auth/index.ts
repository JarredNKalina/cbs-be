import {
	registerUser,
	loginUser,
	changePassword,
	deleteUserById,
	changeEmail,
} from "../../use-cases/auth"

import makePostUser from "./post-register-user"
import makeGetLoginUser from "./get-login-user"
import makePatchChangePassword from "./patch-change-password"
import makeDeleteUser from "./delete-user"
import makePatchChangeEmail from "./patch-change-email"

const postRegisterUser = makePostUser({ registerUser })
const getLoginUser = makeGetLoginUser({ loginUser })
const patchChangePassword = makePatchChangePassword({ changePassword })
const deleteUser = makeDeleteUser({ deleteUserById })
const patchChangeEmail = makePatchChangeEmail({ changeEmail })

const AuthController = Object.freeze({
	postRegisterUser,
	getLoginUser,
	patchChangePassword,
	deleteUser,
	patchChangeEmail,
})

export default AuthController
export { postRegisterUser, getLoginUser, patchChangePassword, deleteUser, patchChangeEmail }

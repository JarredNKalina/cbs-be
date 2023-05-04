import { changeName, getUser } from "../../use-cases/users"

import makeGetGetUser from "./get-user"
import makePatchChangeName from "./patch-change-name"

const patchChangeName = makePatchChangeName({ changeName })
const getGetUser = makeGetGetUser({ getUser })

const UsersController = Object.freeze({
	patchChangeName,
	getGetUser,
})

export default UsersController
export { patchChangeName, getGetUser }

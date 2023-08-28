import { z } from "zod"
import { userCreateDTOValidator } from "../modules/users/users.validators"

export type UserCreateDTO = z.infer<typeof userCreateDTOValidator>

import { z } from "zod"
import { customerCreateDTOValidator } from "../modules/customers/customers.validators"

export type CustomerCreateDTO = z.infer<typeof customerCreateDTOValidator>

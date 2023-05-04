import prisma from "../prisma"
import makeUsersDb from "./users"

export const usersDb = makeUsersDb({ prisma })

export type UsersDb = ReturnType<typeof makeUsersDb>


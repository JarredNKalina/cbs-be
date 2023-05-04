import { Prisma } from "@prisma/client"
import { MakeDb } from "../@types/db"

export default function makeUsersDb({ prisma }: MakeDb) {
	return Object.freeze({
		findMany,
		findById,
		findByEmail,
		create,
		update,
		deleteUser,
	})

	async function findMany() {
		return await prisma.user.findMany({
			where: { firstName: { not: "Internal" } },
		})
	}

	async function findById(id: string | undefined) {
		return await prisma.user.findUnique({
			where: { id },
		})
	}

	async function findByEmail(email: string) {
		return await prisma.user.findUnique({
			where: { email },
		})
	}

	async function create(args: Prisma.UserCreateArgs) {
		return await prisma.user.create(args)
	}

	async function deleteUser(id: string) {
		return await prisma.user.delete({
			where: { id },
		})
	}

	async function update(args: Prisma.UserUpdateArgs) {
		return await prisma.user.update(args)
	}
}

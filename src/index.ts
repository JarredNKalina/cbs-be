import "dotenv/config"

import prisma from "./prisma"
import { server } from "./server"

const PORT = process.env.PORT || 4000

async function main() {
	try {
		await server.listen(PORT, () => console.log(`\n🚀  Server listening on port: ${PORT} 🚀\n`))
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
	}
}

main()

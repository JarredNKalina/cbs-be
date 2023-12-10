import "dotenv/config"

import { server } from "./server"

const PORT = process.env.PORT || 4000
import { Client, Environment } from "square"

export const squareClient = new Client({
	accessToken: process.env.SANDBOX_ACCESS_TOKEN,
	environment: Environment.Sandbox,
})

async function main() {
	try {
		await server.listen(PORT, () => console.log(`\n🚀  Server listening on port: ${PORT} 🚀\n`))
	} catch (e) {
		console.error(e)
	}
}

main()

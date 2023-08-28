import "dotenv/config"

import { server } from "./server"

const PORT = process.env.PORT || 4000
import * as admin from "firebase-admin"
import credentials from "../firebase.json"
import { Client, Environment } from "square"

admin.initializeApp({
	credential: admin.credential.cert(credentials as any),
	projectId: credentials.project_id,
	databaseURL: `https://${credentials?.project_id}.firebaseio.com`,
})

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

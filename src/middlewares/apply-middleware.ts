import cors from "cors"
import helmet from "helmet"
import { Application, json, NextFunction, Request, Response } from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

const swaggerDefinition = {
	info: {
		title: "Project Einstein API docs", // Title of the documentation
		version: "1.0.0", // Version of the app
		description: "Documentation for all CRUD operations and routes in project Einstein", // short description of the app
	},
	host: "localhost:4040", // the host or url of the app
	basePath: "/api/v1", // the basepath of your endpoint
}

const options = {
	swaggerDefinition,
	apis: ["./src/routes/*.yaml"],
}
const swaggerSpec = swaggerJSDoc(options)
export type JsonError = (
	err: SyntaxError | Error,
	req: Request,
	res: Response,
	next: NextFunction
) => void

function parseError(err: SyntaxError | Error) {
	return err instanceof SyntaxError && (err as any).status === 400 && "body" in err
}

const handleJsonError: JsonError = (err, _req, res, next) => {
	if (parseError(err)) {
		return res.status(400).json({ err: (err as any).message })
	}

	return next()
}

export function applyMiddleware(app: Application) {
	app.use(
		cors({
			credentials: true,
			origin: [
				process.env.CLIENT_URL || "http://localhost:3000",
				/\.soldierengagement\.com$/,
			],
		})
	)
	app.use(helmet())
	app.use(json())
	app.use(handleJsonError)
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

import helmet from "helmet"
import { Application, json, NextFunction, Request, Response } from "express"

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
	app.use(helmet())
	app.use(json())
	app.use(handleJsonError)
}

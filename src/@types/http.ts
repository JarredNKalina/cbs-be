import { Request } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { AuthDecodedToken } from "./auth"
import { IncomingHttpHeaders } from "http"

export type File = Express.Multer.File | undefined

export type Files =
	| {
			[fieldname: string]: Express.Multer.File[]
	  }
	| Express.Multer.File[]
	| undefined

export type HttpRequest = {
	body: any
	query: ParsedQs
	params: ParamsDictionary
	ip: string
	method: string
	path: string
	files: Files
	file: File
	headers: IncomingHttpHeaders
	cookies: string | undefined
	decodedToken: AuthDecodedToken | undefined
}

export type HttpResponse = {
	statusCode: number
	body: any
	headers: {
		"Content-Type": string
	}
}

export type ExpressRequestWithToken = Request & {
	decodedToken?: AuthDecodedToken | undefined
}

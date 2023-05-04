import { randomBytes, scryptSync } from "crypto"

const encryptPassowrd = (password: string, salt: string) => {
	const SHA256Keylen = 32
	return scryptSync(password, salt, SHA256Keylen).toString("hex")
}

export const hashPassword = (password: string): string => {
	const saltBytesLength = 16
	const salt = randomBytes(saltBytesLength).toString("hex")
	return encryptPassowrd(password, salt) + salt
}

export const matchPassword = (passowrd: string, hash: string): boolean => {
	const hexPasswordLength = 64
	const salt = hash.slice(hexPasswordLength)
	const originalPassHash = hash.slice(0, hexPasswordLength)
	const currentPassHash = encryptPassowrd(passowrd, salt)
	return originalPassHash === currentPassHash
}

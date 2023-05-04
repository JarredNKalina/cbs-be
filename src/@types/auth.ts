export type LoginUserInput = { email: string; password: string }
export type ChangePasswordInput = { id: string; currentPassword: string; newPassword: string }
export type ChangeEmailInput = { id: string; newEmail: string }
export type ChangeNameInput = { id: string; newFirstName: string; newLastName: string }

export type AuthDecodedToken = {
	email: string
	sub: string
	user: {
		id: string
		firstName: string
		lastName: string
		initials: string
		email: string
		organizationId: string
		roles: { type: string }[]
	}
	exp: number
}

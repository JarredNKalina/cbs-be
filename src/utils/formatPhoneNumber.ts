export function formatPhoneNumber(phoneNumberString: string) {
	var cleaned = ("" + phoneNumberString).replace(/\D/g, "")

	const formattedNumber = `+1${cleaned}`
	console.log({ formattedNumber })
	return formattedNumber
}

export class BaseError extends Error {
	public errorCode: string

	constructor(message: string, errorCode: string) {
		super(message)
		this.name = this.constructor.name
		this.errorCode = errorCode
	}
}

import {BaseError} from './base-error'

export class NotFoundError extends BaseError {
	constructor(message: string, errorCode = 'RESOURCE_NOT_FOUND') {
		super(message, errorCode)
	}
}

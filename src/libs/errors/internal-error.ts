import { BaseError } from "./base-error";

export class InternalError extends BaseError {
    constructor(message: string, errorCode = 'INTERNAL_ERROR') {
        super(message, errorCode);
    }
}
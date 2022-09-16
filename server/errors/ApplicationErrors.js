export class ApplicationError extends Error {
    constructor(message, details = null) {
        super();
        this.message = message;
        if(details !== null) {
            this.details = details;
        }
    }
}

export class ValidationError extends ApplicationError{};
export class DuplicateRecordError extends ApplicationError{};
export class DatabaseRequestError extends ApplicationError{};
export class RecordNotFound extends ApplicationError{};
export class InsufficientData extends ApplicationError{};
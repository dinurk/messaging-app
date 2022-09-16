export class ApiError extends Error {
    constructor(status, applicationError) {
        super();
        this.status = status;
        this.message = applicationError.message;

        if(applicationError.details !== null) {
            this.details = applicationError.details;
        }
    }
}

export class BadRequestError extends ApiError{
    constructor(applicationError) {
        super(400, applicationError);
    }
}

export class NotFoundError extends ApiError{
    constructor(applicationError) {
        super(404, applicationError);
    }
}

export class InternalError extends ApiError{
    constructor(applicationError) {
        super(500, applicationError);
    }
}

export class ConflictError extends ApiError{
    constructor(applicationError) {
        super(409, applicationError);
    }
}

export class RetryWithError extends ApiError{
    constructor(applicationError) {
        super(449, applicationError);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(applicationError) {
        super(401, applicationError);
    }
}
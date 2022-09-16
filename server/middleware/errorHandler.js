import { log } from "../utils/logger.js";
import * as ApiErrors from "../errors/ApiErrors.js";
import * as ApplicationErrors from "../errors/ApplicationErrors.js";

export function errorHandler(error, request, response, next) {
    
    let apiError = null;

    if(error instanceof ApplicationErrors.DuplicateRecordError) {
        apiError = new ApiErrors.ConflictError(error);
    } 

    if(error instanceof ApplicationErrors.InsufficientData) {
        apiError = new ApiErrors.RetryWithError(error);
    } 
    
    if(error instanceof ApplicationErrors.ValidationError) {
        apiError = new ApiErrors.BadRequestError(error);
    } 
    
    if(error instanceof ApplicationErrors.RecordNotFound) {
        apiError = new ApiErrors.NotFoundError(error);
    }

    if(apiError !== null) {
        return response.status(apiError.status).json(apiError);
    }

    log(`ошибка: ${error.stack}`);
    return response.status(500).json({ message : "Возникла непредвиденная ошибка"});
}
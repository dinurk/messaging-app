import * as ApiErrors from "../errors/ApiErrors.js";
import * as ApplicationErrors from "../errors/ApplicationErrors.js";
import jwt from "jsonwebtoken";

export function authorizationChecker(request, response, next) {
    
    let token = null;
    try {
        token = request.headers.authorization.split(' ')[1];
    } catch(error) {
        return next(new ApiErrors.UnauthorizedError(new ApplicationErrors.ApplicationError("некорректное значение токена")), request, response, next);
    }
    
    if(!token) {
        return next(new ApiErrors.UnauthorizedError(new ApplicationErrors.ApplicationError("некорректное значение токена")), request, response, next);
    }
    let userInfo = null;
    try {
        userInfo = jwt.verify(token, process.env.SECRET_KEY_JWT);
    } catch(error) {
        if(error instanceof jwt.TokenExpiredError) {
            return next(new ApiErrors.UnauthorizedError(new ApplicationErrors.ApplicationError("токен не актуален")), request, response, next);
        }
        return next(error, request, response, next);
    }
    request.user = userInfo;

    next();
}
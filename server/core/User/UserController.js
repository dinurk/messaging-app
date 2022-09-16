import * as UserService from "./UserService.js";

export async function register(request, response, next) {
    try {
        const result = await UserService.register(request.body);
        response.status(201).json(result);
    } catch (error) {
        return next(error, request, response, next);
    }
}

export async function authorize(request, response, next) {
    try {
        const result = await UserService.authorize(request.body);
        response.status(200).json(result);
    } catch (error) {
        return next(error, request, response, next);
    }
}

export async function getByNickname(request, response, next) {   
    try {
        const result = await UserService.getByNickname(request.params.nickname);
        response.status(200).json(result);
    } catch (error) {
        return next(error, request, response, next);
    }
}
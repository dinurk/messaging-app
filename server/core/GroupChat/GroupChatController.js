import * as GroupChatService from "./GroupChatService.js";

export async function create(request, response, next) {

    try {
        //request.user.id получено через middleware authorizationChecker (из токена)
        const requestBody = {
            ...request.body,
            administratorId: request.user.id
        } 
        
        let result = await GroupChatService.create(requestBody);
        response.status(201).json(result);

    } catch (error) {
        return next(error, request, response, next);
    }
}

export async function getById(request, response, next) {
    try {
        let result = await GroupChatService.getById(request.params.id);
        response.status(200).json(result);
    } catch (error) {
        return next(error, request, response, next);
    }
}

// export async function inviteUser(request, response, next) {
//     console.log("PARAMS: "+JSON.stringify(request.params));
//     let result = null;
//     try {
//         //получено через middleware authorizationChecker (из токена)
//         const user = { nickname: request.params.nickname };
//         const groupChat = { id: request.params.id };
//         result = await GroupChatService.inviteUser(user, groupChat);
//     } catch (error) {
//         return next(error, request, response, next);
//     }
    
//     response.status(200).json(result);
// }
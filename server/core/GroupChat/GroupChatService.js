import * as GroupChatValidator from "./GroupChatValidator.js";
import * as ApplicationErrors from "../../errors/ApplicationErrors.js"
import * as UserService from "../User/UserService.js";
import * as GroupChatRepository from "./GroupChatRepository.js"

export async function create(creationOptions) {
    
    const {emptyFields, invalidValues} = GroupChatValidator.validateCreationOptions(creationOptions);

    if(emptyFields) {
        throw new ApplicationErrors.InsufficientData("недостаточно параметров в запросе на создание группового чата", 
        emptyFields);
    }
    if(invalidValues) {
        throw new ApplicationErrors.ValidationError("недопустимые значения параметров в запросе создания группового чата", 
        invalidValues);
    }

    let userRecord = null
    try {
        userRecord = await UserService.getById(creationOptions.administratorId);
    } catch (error) {
        throw error;
    }
    if(!userRecord) {
        throw new ApplicationErrors.UnauthorizedError("запрос был отклонен сервером по причине: не удалось подтвердить аккаунт пользователя");
    }
 
    let groupChatRecord = null;
    try {
        groupChatRecord = await GroupChatRepository.save(creationOptions);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(`ошибка при добавлении группового чата в базу данных: ${error}`);
    }

    return {
        name: creationOptions.name,
        id: groupChatRecord.Id
    }
}

export async function getById(id) {

    const validationError = GroupChatValidator.validateId(id);
    if(validationError) {
        throw new ApplicationErrors.ValidationError(validationError);
    }

    let groupChatRecord = null;
    try {
        groupChatRecord = await GroupChatRepository.getById(id);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }

    if(!groupChatRecord) {
        throw new ApplicationErrors.RecordNotFound(`не удалось найти чат с идентификатором ${ id }`);
    }

    return {
        id: groupChatRecord.Id,
        name: groupChatRecord.Name
    };
}

/*
export async function inviteUser(user, groupChat) {

    const userValidationError = UserValidator.validateNickname(user);
    if(userValidationError?.invalidValue) {
        throw new ApplicationErrors.ValidationError("недопустимый никнейм", userValidationError.invalidValue);
    }
    const groupChatIdValidationError = GroupChatValidator.validateId(groupChat);
    if(userValidationError?.invalidValue) {
        throw new ApplicationErrors.ValidationError("недопустимый идентификатор группового чата", groupChatIdValidationError.invalidValue);
    }

    const foundUser = await UserService.getUserByNickname(user);
    if(foundUser == null) {
        throw new ApplicationErrors.EntityInstanceNotFound("не найден пользователь с указанным никнеймом");
    }
    user.id = foundUser.Id;

    let foundRecord = null;
    try {
        foundRecord = await GroupChatParticipantRepository.getRecord(user, groupChat);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }
    if(foundRecord) {
        throw new ApplicationErrors.DuplicateRecordError(`пользователь ${user.nickname}`);
    }

    let result = null;
    try {
        result = await GroupChatParticipantRepository.addRecord(user, groupChat);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }

    return result;
}*/
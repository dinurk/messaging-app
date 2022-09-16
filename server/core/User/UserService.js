import * as UserRepository from "./UserRepository.js";
import * as UserValidator from "./UserValidator.js";
import bcryptjs from "bcryptjs";
import * as ApplicationErrors from "../../errors/ApplicationErrors.js";
import jwt from "jsonwebtoken";

export async function register(registrationData) {

    const {emptyFields, invalidValues} = UserValidator.validateRegistrationData(registrationData);

    if(emptyFields) {
        throw new ApplicationErrors.InsufficientData("недостаточно параметров в запросе регистрации", 
        emptyFields);
    }
    if(invalidValues) {
        throw new ApplicationErrors.ValidationError("недопустимые значения паарметров в регистрационных данных", 
        invalidValues);
    }

    let candidate = null;

    try {
        candidate = await UserRepository.getByEmail(registrationData.email);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }

    if(candidate) {
        throw new ApplicationErrors.DuplicateRecordError("пользователь с указанным адресом электронной почты уже существует");
    }

    candidate = null;
    try {
        candidate = await UserRepository.getByNickname(registrationData.nickname);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }

    if(candidate) {
        throw new ApplicationErrors.DuplicateRecordError("пользователь с указанным никнеймом уже существует");
    }

    const hashedPassword = await bcryptjs.hash(registrationData.password, 7);
    const newUserData = {...registrationData, hashedPassword};
    
    try {
        await UserRepository.save(newUserData);
    } catch(error) {
        throw new ApplicationErrors.DatabaseRequestError(`ошибка при добавлении пользователя в базу данных: ${error}`);
    }

    return {
        name: registrationData.name,
        email: registrationData.email,
        nickname: registrationData.nickname
    }
}

export async function authorize(authorizationData) {

    const {emptyFields, invalidValues} = UserValidator.validateAuthorizationData(authorizationData);

    if(emptyFields) {
        throw new ApplicationErrors.InsufficientData("недостаточно параметров в запросе регистрации", 
        emptyFields);
    }
    if(invalidValues) {
        throw new ApplicationErrors.ValidationError("недопустимые значения параметров в авторизационных данных", 
        invalidValues);
    }

    let userRecord = null;

    try {
        userRecord = await UserRepository.getByNickname(authorizationData.nickname);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }
    if(!userRecord) {
        throw new ApplicationErrors.RecordNotFound("неверно указан никнейм или пароль");
    }

    const isPasswordValid = await bcryptjs.compare(authorizationData.password, userRecord.Password);
    if(!isPasswordValid) {
        throw new ApplicationErrors.RecordNotFound("неверно указан никнейм или пароль");
    }

    const token = jwt.sign(
        { id: userRecord.Id },  
        process.env.SECRET_KEY_JWT, 
        { expiresIn: "24h" }
    );
    
    return {
        token
    };
}

export async function getByNickname(nickname) {
    
    const validationError = UserValidator.validateNickname(nickname);
    if(validationError) {
        throw new ApplicationErrors.ValidationError(validationError);
    }

    let userRecord = null;
    try {
        userRecord = await UserRepository.getByNickname(nickname);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }

    if(!userRecord) {
        throw new ApplicationErrors.RecordNotFound(`не удалось найти пользователя с никнеймом ${ nickname }`);
    }

    return {
        id: userRecord.Id,
        nickname: userRecord.Nickname,
        name: userRecord.Name
    };
}

export async function getById(id) {
    
    const validationError = UserValidator.validateId(id);
    if(validationError) {
        throw new ApplicationErrors.ValidationError(validationError);
    }

    let userRecord = null;
    try {
        userRecord = await UserRepository.getById(id);
    } catch (error) {
        throw new ApplicationErrors.DatabaseRequestError(error);
    }

    if(!userRecord) {
        throw new ApplicationErrors.RecordNotFound(`не удалось найти пользователя с идентификатором ${ id }`);
    }

    return {
        id: userRecord.Id,
        nickname: userRecord.Nickname,
        name: userRecord.Name
    };
}
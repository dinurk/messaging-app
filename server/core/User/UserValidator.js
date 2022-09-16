import validator from "validator";

export function validateAuthorizationData(authorizationData) {

    const emptyFields = [];
  
    if(authorizationData.nickname === undefined) {
        emptyFields.push("nickname");
    }
    if(authorizationData.password === undefined) {
        emptyFields.push("password");
    }

    if(emptyFields.length > 0) {
        return { emptyFields };
    }

    const invalidValues = [];

    if(!validator.isLength(authorizationData.nickname, {min: 2, max: 40})) {
        invalidValues.push({ field: "nickname", constraint: "никнейм пользователя должен иметь длину от 2 до 40 символов"});
    }
    if(!validator.isLength(authorizationData.password, {min: 8, max: 20})) {
        invalidValues.push({ field: "password", constraint: "пароль должен иметь длину от 8 до 100 символов"});
    }

    if(invalidValues.length > 0) {
        return { invalidValues };
    }

    return {};
}

export function validateRegistrationData(registrationData) {
    
    const emptyFields = [];

    if(registrationData.email === undefined) {
        emptyFields.push("email");
    }
    if(registrationData.password === undefined) {
        emptyFields.push("password");
    }
    if(registrationData.name === undefined) {
        emptyFields.push("name");
    } 
    if(registrationData.nickname === undefined) {
        emptyFields.push("nickname");
    }

    if(emptyFields.length > 0) {
        return { emptyFields };
    }

    const invalidValues = [];

    if(!validator.isEmail(registrationData.email)) {
        invalidValues.push({ field: "email", constraint:"указанный адрес электронной почты имеет неверный формат (отсутствует символ @ и/или некорректно указан домен)" });
    } 
    if(!validator.isLength(registrationData.email, { min: 7, max: 100 })) {
        invalidValues.push({ field: "email", constraint: "адрес электронной почты должен иметь длину от 7 до 100 символов"});
    }
    if(!validator.isLength(registrationData.password, {min: 8, max: 20})) {
        invalidValues.push({ field: "password", constraint: "пароль должен иметь длину от 8 до 100 символов"});
    }
    if(!validator.isLength(registrationData.name, {min: 2, max: 40})) {
        invalidValues.push({ field: "name", constraint: "имя пользователя должно иметь длину от 2 до 40 символов"});
    }
    if(!validator.isLength(registrationData.nickname, {min: 2, max: 40})) {
        invalidValues.push({ field: "nickname", constraint: "никнейм пользователя должен иметь длину от 2 до 40 символов"});
    }

    if(invalidValues.length > 0) {
        return { invalidValues };
    }

    return {};
}

export function validateNickname(nickname) {
    if(!validator.isLength(nickname, {min: 2, max: 40})) {
        return "никнейм пользователя должен иметь длину от 2 до 40 символов";
    }
}

export function validateId(id) {
    if(!Number.isInteger(Number(id)) && id >= 0) {
        return "идентификатор пользователя должен быть неотрицательным целым числом";
    }
}
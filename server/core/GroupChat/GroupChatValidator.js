import validator from "validator";
import * as UserValidator from "../User/UserValidator.js"

export function validateCreationOptions(creationOptions) {

    const emptyFields = [];

    if(creationOptions.name === undefined) {
        emptyFields.push("name");
    }
    if(creationOptions.administratorId === undefined) {
        emptyFields.push("administratorId");
    }

    if(emptyFields.length > 0) {
        return { emptyFields };
    }

    const invalidValues = [];

    if(!validator.isLength(creationOptions.name, {min: 2, max: 100})) {
        invalidValues.push({ field:"name", constraint: "название чата должно иметь длину от 2 до 100 символов" });
    }
    const userIdValidationError = UserValidator.validateId(creationOptions.administratorId);
    if(userIdValidationError) {
        invalidValues.push({ field:"administratorId", constraint: userIdValidationError });
    }

    if(invalidValues.length > 0) {
        return { invalidValues };
    }

    return {};
} 

export function validateId(id) {
    if(!Number.isInteger(Number(id)) && id >= 0) {
        return { invalidValue: "идентификатор чата должен быть неотрицательным целым числом" };
    }
} 
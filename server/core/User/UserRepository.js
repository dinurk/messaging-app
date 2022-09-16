import { UserModel } from "./UserModel.js";

export async function getById(id) {
    return await UserModel.findByPk(id);
}

export async function getByEmail(email) {
    return await UserModel.findOne({ where: { Email : email }});
}

export async function getByNickname(nickname) {
    return await UserModel.findOne({ where: { Nickname : nickname }});
}

export async function save(userData) {
    const userRecord = new UserModel({ 
        Name : userData.name, 
        Email: userData.email, 
        Nickname: userData.nickname, 
        Password: userData.hashedPassword 
    });
    await userRecord.save();
}
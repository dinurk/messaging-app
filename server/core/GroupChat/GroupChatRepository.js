import { sequelize } from "../../database.js";
import { GroupChatParticipantModel } from "../GroupChatParticipant/GroupChatParticipantModel.js";
import { GroupChatModel } from "./GroupChatModel.js";
import * as UserRepository from "../User/UserRepository.js"

export async function save(groupChatData) {

    const transaction = await sequelize.transaction();

    try {

        const groupChatRecord = await GroupChatModel.create({
            Name: groupChatData.name,
            AdministratorId: groupChatData.administratorId
        }, transaction);

       const userRecord = await UserRepository.getById(groupChatData.administratorId);

        groupChatRecord.addUser(userRecord);

        await transaction.commit();
        return groupChatRecord;

    } catch(error) {
        await transaction.rollback();
        throw error;
    } 
}

export async function getById(id) {
    return await GroupChatModel.findByPk(id);
}
import { GroupChatParticipantModel } from "./GroupChatParticipantModel.js";
import * as UserService from "../User/UserService.js"

export async function getRecord(user, groupChat) {
    return await GroupChatParticipantModel.findOne({ where: { UserId : user.id, GroupChatId: groupChat.id }});
}

export async function addRecord(user, groupChat) {
    const recordCreated = new GroupChatParticipantModel({UserId:user.id, GroupChatId: groupChat.id});
    await recordCreated.save();
    return recordCreated;
}
import { sequelize } from "../../database.js";
 
const GroupChatParticipantModel = sequelize.define('GroupChatParticipant', {}, { timestamps: false });

export { GroupChatParticipantModel }
import { UserModel } from "../User/UserModel.js";
import { sequelize } from "../../database.js";
import { DataTypes } from "sequelize";
import { GroupChatParticipantModel } from "../GroupChatParticipant/GroupChatParticipantModel.js";

const GroupChatModel = sequelize.define('GroupChat', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "Новый групповой чат"
    }
  }, {
    timestamps: false
});

UserModel.hasOne(GroupChatModel, {
    foreignKey: {
        name: 'AdministratorId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    }
}); 
GroupChatModel.belongsTo(UserModel, {
    foreignKey:"AdministratorId",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false
});

GroupChatModel.belongsToMany(UserModel, {through: GroupChatParticipantModel});
UserModel.belongsToMany(GroupChatModel, {through: GroupChatParticipantModel});

export { GroupChatModel };
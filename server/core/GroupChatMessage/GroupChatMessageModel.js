import { DataTypes } from "sequelize";
import { UserModel } from "../User/UserModel.js";
import { sequelize } from "../../database.js";
import { GroupChatModel } from "../GroupChat/GroupChatModel.js";
 
const GroupChatMessageModel = sequelize.define('GroupChatMessage', {

    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Text: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    }, {
    timestamps: false
});

UserModel.hasMany(GroupChatMessageModel, {
    foreignKey: {
        name: 'SenderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    }
}); 
GroupChatMessageModel.belongsTo(UserModel, {
    foreignKey: {
        name: 'SenderId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    }
});

GroupChatModel.hasMany(GroupChatMessageModel, {
    foreignKey: {
        name: 'GroupChatId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
    }
}); 
GroupChatMessageModel.belongsTo(GroupChatModel);

export {GroupChatMessageModel};
import { DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const UserModel = sequelize.define('User', {
    
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    Name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
  }, {
    timestamps: false
});

export {UserModel};
const { sequelize, DataTypes } = require('sequelize')
const db = require('../config/dbConfig')
const UserModel = db.define("user", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncriment: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    }


})
module.exports = UserModel
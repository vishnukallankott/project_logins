const { request } = require('express')
const { sequelize, DataTypes } = require('sequelize')
const db = require('../config/dbConfig')
const UserLoginLogsModel = db.define("user_login_logs", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncriment: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        references: {
            model: user,
            key: id
        },
        allowNull: false
    },
    current_logged_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW()
    },
    last_logged_time: {
        type: DataTypes.DATE,
        defaultValue: null
    },
})
module.exports = UserLoginLogsModel
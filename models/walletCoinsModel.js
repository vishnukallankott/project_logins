const { request } = require('express')
const { sequelize, DataTypes } = require('sequelize')
const db = require('../config/dbConfig')
const userWalletModel = db.define("user_wallet_coins", {
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
    wallet_coins: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})
module.exports = userWalletModel
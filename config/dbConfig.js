
const Sequelize = require("sequelize");
const dotenv=require('dotenv')
dotenv.config()

    const db = new Sequelize(process.env.dbname,process.env.dbUser,process.env.dbpass,{
        host:process.env.host,
        dialect:'mysql',
        define:{freezeTableName:true},
        logging:false
    
    })

module.exports=db

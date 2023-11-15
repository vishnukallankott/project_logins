
const Sequelize = require("sequelize");
const dotenv=require('dotenv')
dotenv.config()
const connection=async ()=>{
    try{
            await database.authenticate()
            await database.sync({alter:true})
            console.log("Data Base Connecton Established succesfully")
    }
    catch(e){
        console.log("error occured",e.error)
    }
}

module.exports=connection
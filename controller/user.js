const userModel=require('../models/userModel')
const userLoginLogsModel=require('../models/user')
const walletConsModel=require('../models/walletCoinsModel')
const bcrypt=require('bcrypt')
const userWalletModel = require('../models/walletCoinsModel')
const saltRounds=10
const addUser=async (req,reply)=>{
    try{
    const {name,email,password}=req.body
    if(!name && !email && !password){
        return reply.status(406).send({
            status:false,
            message:"User is already registerd"
        }) 
    }
    const user=await userModel.findOne({where:{email:email}})
    if(user){
        return reply.status(406).send({
            status:false,
            message:"User is already registerd"
        })
    }
    let hasedPasswod=bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if(err){
                console.log(err)
            }
            else{
                return hash
            }
        });
    });
    const createUser=await userModel.create({name,email,password:hasedPasswod})
    if(!createUser){
        return reply.status(400).send({status:false,message:"Bad request"})
    }
    const addLogs=await userLoginLogsModel.create({user_id:createUser.id})

    const addWalletCoins=await userWalletModel.create({user_id:createUser.id,wallet_coins:10})
reply.status(201).send({status:true,
message:"user registered successfully"})    
}
    catch(e){
        reply.status(500).send({
            status:false,
            error:e
        })
    }
}

const LoginUser=async (req,reply)=>{
    try{
    const {email,password}=req.body
    if(!email && !password){
        return reply.status(406).send({
            status:false,
            message:"Not Acceptable"
        }) 
    }
    const user=await userModel.findOne({where:{email:email}})
    if(!user){
        return reply.status(404).send({
            status:false,
            message:"User Not Found"
        })
    }
   let currentTime=new Date()
   let walletcurrecyUpdated
    bcrypt.compare(password, user.password, async function(err, result) {
        if(result==true){
            const userLoginDetails=await userLoginLogsModel.findOne({where:{user_id:user.id},order: [
                ['current_logged_time', 'DESC'],limit(1)
            ],})
            if(userLoginDetails.current_logged_time-currentTime<=1){
               
                const currentCurrrency=await walletConsModel.findOne({where:{user_id:user.id}}) 
                walletcurrecyUpdated=currentCurrrency+10
                await walletConsModel.update({wallet_coins:walletcurrecyUpdated},{where:{user_id:user.id}})
                await userLoginLogsModel.create({user_id:createUser.id,last_logged_time:userLoginDetails.current_logged_time})
                reply.status(200).send({status:true,
                    message:"Succesffuly_loged",
                    token:"ggggggg"
                })
            }
            else{
                await walletConsModel.update({wallet_coins:10},{where:{user:user.id,}})
                await userLoginLogsModel.create({user_id:createUser.id,last_logged_time:null})
                reply.status(200).send({status:true,
                    message:"Succesffuly_loged",
                    token:"ggggggg"
                })
            }
        }
        // result == true
    });
   
    const createUser=await userModel.create({name,email,password:hasedPasswod})
    if(!createUser){
        return reply.status(400).send({status:false,message:"Bad request"})
    }
    const addLogs=await userLoginLogsModel.create({user_id:createUser.id})

    const addWalletCoins=await userWalletModel.create({user_id:createUser.id,wallet_coins:10})
reply.status(201).send({status:true,
message:"user registered successfully"})    
}
    catch(e){
        reply.status(500).send({
            status:false,
            error:e
        })
    }
}

module.exports={
    addUser,
    LoginUser
}
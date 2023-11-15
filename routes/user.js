
const {
    addUser,
    LoginUser
}  =require('../controller/user')
module.exports=function(router){
    router.post('/register',addUser)
    router.post('/logins',LoginUser)
return router
}
const express = require('express')
const dotenv = require('dotenv')
const { RoutesLoader } = require('expressjs.routes.autoload')
const dbConnction = require('./config/dbConnection')
const path = require('path')
dotenv.config()
dbConnction()
const app = express()
app.set('host', process.env.host)
app.set('port', process.env.port)
app.use(RoutesLoader(path.join(__dirname,'./routes'),true))
app.listen(app.get('host'), () => {
    console.log("app runnig", app.get('port')
    )
})

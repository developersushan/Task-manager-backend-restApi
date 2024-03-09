//basic Lip import

const express = require('express')
const mongoose = require('mongoose')
const rateLimiter  = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const helmet = require('helmet')
const router = require('./src/routes/api')

const app = new express()
//Cors Open
app.use(cors())

//security implement

app.use(helmet())
app.use(hpp())
app.use(express.json({limit:'20MB'}))
app.use(express.urlencoded({extended:true}))
const limiter = rateLimiter({windowMs:15*60*100,max:3000})
app.use(limiter)


//mongoose connection

const URL = "mongodb://localhost:27017/taskManager5";
const OPTION = {user:"",pass:"",autoIndex:true};
mongoose.connect(URL,OPTION,).then((res)=>{
    console.log('database connected...')
}).catch((err)=>{
    console.log(err)
})
//router implement
app.use('/api',router)
//404 not found implement
app.use('*', (req,res)=>{
    res.status(404).json({data:'404 not Found'})
})

module.exports = app
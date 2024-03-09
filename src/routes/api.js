const express =require ('express');
const { Registration,login, profileUpdate, verifyEmail, verifyOTP, passwordReset, profileDetails } = require('../controller/UserController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const { destroy,read, create, update } = require('../controller/TaskController');



const router = express.Router()

router.post('/registration', Registration)
router.post('/login' , login)
router.get('/verifyEmail/:email' , verifyEmail)
router.get('/verifyOtp/:email/:otp' , verifyOTP)
router.get('/passwordReset/:email/:otp/:password' , passwordReset )

//after login 
router.post('/profileUpdate' ,AuthMiddleware , profileUpdate)
router.get('/profileDetails' ,AuthMiddleware ,profileDetails)

//Task Manager api 
router.post('/task/create', AuthMiddleware , create)
router.post('/task/update/:id' , AuthMiddleware, update)
router.get('/task/read', AuthMiddleware , read)
router.get('/task/delete/:id', AuthMiddleware , destroy)

module.exports = router;
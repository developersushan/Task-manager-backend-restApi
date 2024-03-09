const userModel = require("../model/UserModel")
const jwt = require('jsonwebtoken')
const SendEmailUtility =require('../utility/EmailSend')
const OTPModel = require("../model/OPTModel")
exports.Registration=async(req,res)=>{
    try{
        let reqBody = req.body
        await userModel.create(reqBody)
        return res.status(200).json({status:"success",message:'registration completed'})
    }catch(err){
        return res.json({status:'fail',message:err})
    }
}
exports.login = async(req,res)=>{
    try{
        let reqBody = req.body
        let user =  await userModel.find(reqBody)

        if(user.length>0){
            //jwt

            let payload = {exp:Math.floor(Date.now()/1000)+(24*60*60),data:reqBody['email']}
            let token = jwt.sign(payload,'123-xyz-abc')
            return res.status(200).json({status:"success",message:'user successfully login',token:token})
        }else{
        return res.json({status:'fail',message:'user not Found'})
        }

    }catch(err){
        return res.json({status:'fail',message:err})
    }
}

exports.profileDetails =async(req,res)=>{
    try{
        let email = req.headers['email']
        let result = await userModel.find({email:email})
        res.json({status:'success',data:result})
    }catch(err){
        res.json({status:'fail',message:err})
    }
}

exports.profileUpdate =async(req,res)=>{
    try{
        let email = req.headers['email']
        let reqBody = req.body
        await userModel.updateOne({email:email},reqBody)
        
        res.status(200).json({status:'profile update successfully completed'})
    }catch(err){
        res.status(404).json({message:err})
    }
}

exports.verifyEmail = async(req,res)=>{
    try{
        let email = req.params.email
        let user = await userModel.find({email:email})
        if(user.length>0){
            let otp = Math.floor(100000+Math.random()*900000)
            await SendEmailUtility(email, `your pin code : ${otp}`, 'MERN5 batch otp code')
            
            OTPModel.create({email:email,otp:otp,status:'active'})
            res.status(200).json({message:'verify email successfully completed'})
        }else{
            res.status(404).json({message:'data not found'})
        }
    }catch(err){
        res.status(404).json({message:err})
    }
}
exports.verifyOTP = async(req,res)=>{
    try{
        let {email,otp} = req.params
        let user = await OTPModel.find({email:email,otp:otp ,status:'active'})
        if(user.length>0){
            await OTPModel.updateOne({email:email,otp:otp},{status:'verified'})
            res.status(200).json({message:'verification successful'})
        }else{
            res.status(401).json({message:'invalid verification code'})
        }
    }catch(err){
        res.status(404).json({message:err})
    }
}
exports.passwordReset = async(req,res)=>{
    try{
        let {email,otp,password} = req.params
        let user = await OTPModel.find({email:email,otp:otp,status:'verified'})
        if(user.length>0){
            await OTPModel.deleteOne({email:email,otp:otp})
            await userModel.updateOne({email:email},{password:password})
            res.status(200).json({message:'password reset successfully completed'})
        }else{
            res.status(401).json({message:'password reset not found'})
        }
    }catch(err){
        res.status(404).json({message:err})
    }
}


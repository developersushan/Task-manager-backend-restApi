const TaskModel = require("../model/TaskModel")

exports.create=async(req,res)=>{
    try{
        let email = req.headers['email']
        let reqBody = req.body
        reqBody.email = email
        await TaskModel.create(reqBody)
        
        res.status(200).json({status:'profile update successfully completed'})
    }catch(err){
        res.status(404).json({message:err})
    }
}

exports.update=async(req,res)=>{
    try{
        let email = req.headers['email']
        let reqBody =req.body
        let {id} = req.params
        await TaskModel.updateOne({_id:id,email:email},reqBody)
        res.status(200).json({status:'success', message:'successfully update'})
    }catch(err){
        res.status(401).json({status:'not found' , message:'update not found'})
    }


}
exports.read=async(req,res)=>{
    try{
        let email = req.headers['email']
        let data = await TaskModel.find({email:email})
        res.status(200).json({status:'success', data:data})

    }catch(err){
        res.status(401).json({status:'not found ',message:'data not found'})
    }
}

exports.destroy =async(req,res)=>{
    try{
        let email = req.headers['email']
        let reqBody = req.body
        let {id} = req.params
        await TaskModel.deleteOne({_id:id,email:email},reqBody)
        res.status(200).json({status:'success', message:'successfully delete data'})
    }catch(err){
        res.status(401).json({status:'fail data', message:'data not delete'})
    }
}
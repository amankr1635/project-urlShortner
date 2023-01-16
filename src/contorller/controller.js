const urlModel = require("../models/urlModels")


//=============Create API==============//

exports.createUrl = async(req,res)=>{
    try{
       let data = req.body

       let createData = await urlModel.create(data)

       return res.status().send({status:true,data:createData})
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


//==================Get API================//

exports.getUrl = async (req,res) =>{
    try{
        let data = req.params

        let getData = await urlModel.find()
        
        return res.status().send({status:false,data:getData})

    }catch(error){
        return res.status(500).send({status:false , message:error.message})
    }
}


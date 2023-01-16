const express = require("express");
const router = express.Router();
const controller = require("../contorller/controller");






router.all("/*" ,function(req,res){
    res.status(400).send({status:false, msg: "Invalid Http Request" })
})

module.exports = router
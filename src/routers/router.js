const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");






router.all("/*" ,function(req,res){
    res.status(400).send({status:false, message: "Invalid Http Request" })
})

module.exports = router
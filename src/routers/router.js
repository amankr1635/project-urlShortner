const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");


router.post('/url/shorten', controller.create)

router.get('/:urlCode', controller.getUrl)

console.log("i m here")

router.all("/*", (req, res) => {
    res.status(400).send({ status: false, message: "invalid HTTP request" })
})

module.exports = router
const shortId = require('shortid')
const axios = require('axios')
const validUrl = require('valid-url')
const urlModel = require("../models/urlModels")


//=============Create API==============//

const create = async (req, res) => {
    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter body on body" })
        }
        if (typeof (body.longUrl) !== "string") {
            return res
                .status(400)
                .send({ status: false, message: "Please enter valid url in string" })
        }
        if (!validUrl.isUri(body.longUrl.trim())) {
            return res
                .status(400)
                .send({ status: false, message: "Please enter valid url" })
        }

        let checkUrl = await axios.get(body.longUrl)
            .then(() => body.longUrl)
            .catch((err) => null)
            // console.error("hello axios")

        if (!checkUrl) {
            return res
                .status(404)
                .send({ status: false, message: "Not found" })
        }
        let createUrl = shortId.generate().toLowerCase()
        let baseUrl = "http://localhost:3000/"
        body.shortUrl = baseUrl + createUrl
        body.urlCode = createUrl

        let checkData = await urlModel.findOne({ longUrl: body.longUrl })
            .select({ urlCode: 1, longUrl: 1, shortUrl: 1, _id: 0 })

        if (checkData) {
            return res
                .status(200)
                .send({ message: "This url is already exist", data: checkData })
        }

        let createData = await urlModel.create(body)
        return res
            .status(201)
            .send({
                status: true,
                body: { longUrl: body.longUrl, shortUrl: body.shortUrl, urlCode: body.urlCode }
            })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//==================Get API================//

const getUrl = async (req, res) => {
    try {
        let param = req.params.urlCode
      
        if(!shortId.isValid(param)){
            return res.status(400).send({status:false, message:"urlcode is not valid"})
        }

        let getData = await urlModel.findOne({urlCode:param}).select({longUrl:1, _id:0})
        if(!getData){
            return res.status(404).send({status:false, message:"no such data exist"})
        }
        let longUrl = getData.longUrl

        res.status(302).redirect(longUrl);

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.create = create
module.exports.getUrl = getUrl
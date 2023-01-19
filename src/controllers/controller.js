const urlModel = require("../models/urlModels");
const shortId = require("shortid");
const axios = require("axios");
const  { promisify } = require("util");
const redisClint = require("../redis/redis")

const SET_ASYNC = promisify(redisClint.SETEX).bind(redisClint); //setex figuer it out
const GET_ASYNC = promisify(redisClint.GET).bind(redisClint); //getex explore

//=============Create API==============//

const create = async (req, res) => {
  try {
    let body = req.body;

    if (Object.keys(body).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter data on body" });
    }

    if (typeof body.longUrl !== "string") {
      return res
        .status(400)
        .send({ status: false, message: "Please enter url in string" });
    }

    let longUrl = await GET_ASYNC(`${body.longUrl}`);

    let objectConversion = JSON.parse(longUrl);

    if (longUrl) {
      return res.status(200).send({status: true ,message : "data is coming from cache and it is already exist", data : objectConversion});
    }

    let checkUrl = await axios
      .get(body.longUrl)
      .then(() => body.longUrl)
      .catch((err) => null);

    if (!checkUrl) {
      return res.status(400).send({ status: false, message: "invalid url" });
    }

    let createUrl = shortId.generate().toLowerCase();

    let baseUrl = "http://localhost:3000/";
    body.shortUrl = baseUrl + createUrl;
    body.urlCode = createUrl;

    let checkData = await urlModel
      .findOne({ longUrl: body.longUrl })
      .select({ urlCode: 1, longUrl: 1, shortUrl: 1, _id: 0 });

    if (checkData) {
      return res
        .status(200)
        .send({ message:"this data is already exist and it is coming from mongo db", data: checkData });
    }

    let createData = await urlModel.create(body);

    let urls = {longUrl:createData.longUrl, urlCode: createData.urlCode, shortUrl: createData.shortUrl}

    await SET_ASYNC(`${body.longUrl}`, 60 * 1440, JSON.stringify(urls));

    return res.status(201).send({
      status: true,
      data: {longUrl:urls.longUrl, urlCode: urls.urlCode, shortUrl: urls.shortUrl}
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//==================Get API================//

const getUrl = async (req, res) => {
  try {
    let param = req.params.urlCode;

    if (!shortId.isValid(param)) {
      return res
        .status(400)
        .send({ status: false, message: "urlcode is not valid" });
    }

    let createdUrl = await GET_ASYNC(`${param}`);

    let objectConversion = JSON.parse(createdUrl);

    if (createdUrl) {
      return res.status(302).redirect(objectConversion);
    } else {
      let getUrl = await urlModel
        .findOne({ urlCode: param })
        .select({ longUrl: 1, _id: 0 });

      if (!getUrl) {
        return res
          .status(404)
          .send({ status: false, message: "no such Url exist" });
      }

      let longUrl = getUrl.longUrl;

      await SET_ASYNC(`${param}`, 60 * 1440, JSON.stringify(longUrl));
      res.status(302).redirect(longUrl);
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.create = create;
module.exports.getUrl = getUrl;

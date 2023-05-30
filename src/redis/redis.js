const redis = require("redis");
require('dotenv').config();


const client = redis.createClient(process.env.REDIS_URL);
client.on('error', (err) => console.log('Redis Client Error', err))
console.log("Connected to Redis..")

module.exports = client
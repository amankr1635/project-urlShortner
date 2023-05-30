const redis = require("redis");
require('dotenv').config();


const client = redis.createClient(process.env.REDIS_URL);
client.on('error', (err) => console.log('Redis Client Error', err))
console.log("Connected to Redis..")

// const redisClint = redis.createClient({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
//   no_ready_check: true,
// });
// redisClint.auth(process.env.REDIS_PASSWORD, function (err) {
//   if (err) throw err;
// });


// redisClint.on("connect", async function () {
//   console.log("connected to redis");
// });

module.exports = client
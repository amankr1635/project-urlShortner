const redis = require("redis")
require('dotenv').config();

const redisClint = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  no_ready_check: true,
});
redisClint.auth(process.env.REDIS_PASSWORD, function (err) {
  if (err) throw err;
});


redisClint.on("connect", async function () {
  console.log("connected to redis");
});

module.exports = redisClint
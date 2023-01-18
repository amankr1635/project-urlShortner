const redis = require("redis")

const redisClint = redis.createClient(
    13032,
    "redis-13032.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
  );
  redisClint.auth("ImsB8tvefgIR7PZ8ajhZVxFNjbo6Bb4f", function (err) {
    if (err) throw err;
  });
  
  redisClint.on("connect", async function () {
    console.log("connected to redis");
  });

  module.exports = redisClint


//   alias : redis-cli -u redis://default:ImsB8tvefgIR7PZ8ajhZVxFNjbo6Bb4f@redis-13032.c301.ap-south-1-1.ec2.cloud.redislabs.com:13032
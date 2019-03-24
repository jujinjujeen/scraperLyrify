const { promisifyAll } = require('bluebird');
const redis = promisifyAll(require("redis"));
const client = redis.createClient(process.env.REDIS_URL);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong: \n' + err);
});

module.exports = {
    get: client.getAsync.bind(client),
    set: client.set.bind(client)
};


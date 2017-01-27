// in startup server file (ex: /imports/startup/server/redis.js)
import { RedisOplog } from 'meteor/cultofcoders:redis-oplog';

  console.log('Redist init');

  // simple usage
  // RedisOplog.init() // will work with 127.0.0.1:6379, the default

  // sets up the configuration parameters:
  // https://github.com/luin/ioredis#connect-to-redis
  RedisOplog.init({
      redis: {
          port: 6379,          // Redis port
          host: '127.0.0.1',   // Redis host
      },
      debug: true, // default is false,
      overridePublishFunction: false // default is true, replaces .publish with .publishWithRedis, set to false if you don't want to override it
  });

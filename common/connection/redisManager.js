import ENV from '../utils/env';
import { createClient } from 'redis';

const RedisManager = (() => {
  const redisClient = createClient({
    url: `redis://${ENV.EXPRESS_SERVER01_REDIS_URL}:${ENV.EXPRESS_SERVER01_REDIS_PORT}`,
    password: ENV.EXPRESS_SERVER01_REDIS_PASSWORD,
  });

  const connectClient = async () => {
    try {
      await redisClient.connect();
      console.log(`Redis Connected`);
    } catch (err) {
      console.error(`Error connecting to RedisClient:`, err);
    }
  };

  connectClient();

  const getClient = () => {
    if (!redisClient.isOpen) {
      throw new Error('Server client is not connected.');
    }
    return redisClient;
  };

  return {
    getClient,
  };
})();

export default RedisManager;

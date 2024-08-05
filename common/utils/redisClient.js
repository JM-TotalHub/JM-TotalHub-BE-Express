import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const redisClient = createClient({
  url: `redis://${process.env.EXPRESS_SERVER01_REDIS_URL}:${process.env.EXPRESS_SERVER01_REDIS_PORT}`,
  password: process.env.EXPRESS_SERVER01_REDIS_PASSWORD,
});

redisClient
  .connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch((err) => {
    console.error('Error connecting to Redis:', err);
  });

export default redisClient;

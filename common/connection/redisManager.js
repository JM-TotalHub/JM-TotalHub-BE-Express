import { createClient } from 'redis';

class RedisManager {
  constructor() {
    this.clients = {
      serverClient: createClient({
        url: `redis://${process.env.EXPRESS_SERVER01_REDIS_URL}:${process.env.EXPRESS_SERVER01_REDIS_PORT}`,
        password: process.env.EXPRESS_SERVER01_REDIS_PASSWORD,
      }),
      signalClient: createClient({
        url: `redis://${process.env.SIGNAL_SERVER_REDIS_URL}:${process.env.SIGNAL_SERVER_REDIS_PORT}`,
        password: process.env.SIGNAL_SERVER_REDIS_PASSWORD,
      }),
    };

    this.connectClients();
  }

  async connectClients() {
    for (const [key, client] of Object.entries(this.clients)) {
      try {
        await client.connect();
        console.log(`Connected to ${key}`);
      } catch (err) {
        console.error(`Error connecting to ${key}:`, err);
      }
    }
  }

  getClient(clientName) {
    return this.clients[clientName];
  }
}

const redisManager = new RedisManager();

export default redisManager;

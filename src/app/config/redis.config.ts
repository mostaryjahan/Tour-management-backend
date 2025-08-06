import { createClient } from "redis";
import { envVars } from "./env";

const redisClient = createClient({
  username: envVars.REDIS_USERNAME,
  password: envVars.REDIS_PASSWORD,
  socket: {
    host: envVars.REDIS_HOST,
    port: Number(envVars.REDIS_PORT),
  },
});

redisClient.on("error", (err) => console.log("Redis  Error", err));


export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("redis connected");
  }
};


// await connectRedis(); // ✅ Connect first

// await redisClient.set("foo", "bar");
// const result = await redisClient.get("foo");
// console.log(result);
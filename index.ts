import "@config/dotenv";

import redis from "@config/redisClient";

import app from "@/server";

const portNumber = process.env.PORT || 5000;

initServices()
  .then(() => {
    app.listen(portNumber, () => {
      console.log(`server is listening on port ${portNumber}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

async function initServices() {
  try {
    await redis.connect();
  } catch (err) {
    return Promise.reject("Não foi possível iniciar todos os serviços");
  }
}

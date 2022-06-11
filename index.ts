import "@config/dotenv";

import app from "@/server";

const portNumber = process.env.PORT || 5000;

app.listen(portNumber, () => {
  console.log(`server is listening on port ${portNumber}`);
});

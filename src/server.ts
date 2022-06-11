import express from "express";
import cors from "cors";

import router from "@routes/index";

import errorHandler from "@middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorHandler);

export default app;

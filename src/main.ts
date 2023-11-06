import express from "express";
import cors from 'cors';
import helmet from "helmet";
import router from "./router";
import { PrismaClient } from "@prisma/client";
import * as swaggerUi from 'swagger-ui-express';
import path from "path";
import { config } from "dotenv";
import { specs } from "./swagger";
config();

const app = express();

app.use(helmet());
app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));


const whitelist = ["*"];

const corsOptions : cors.CorsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public", "index.html"))
})

app.use('/api', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export const prisma = new PrismaClient({
  log: ["query"]
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Eco coding interview server start on port: ${PORT}`);
});
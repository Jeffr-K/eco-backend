import express from "express";
import cors from 'cors';
import helmet from "helmet";
import router from "./router";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import favicon from "express-favicon";

config();

const app = express();

app.use(helmet());
app.use(favicon(__dirname + '/public/favicon.png'));

const whitelist = ["http://localhost:3000", "http://localhost:8000","http://127.0.0.1:3000", "http://127.0.0.1:8000"];

const corsOptions : cors.CorsOptions = {
  origin: whitelist,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).send({ message: "server is running ok" })
});
app.use('/api', router);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

export const prisma = new PrismaClient({
  log: ["query"]
});


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Eco coding interview server start on port: ${process.env.SERVER_PORT}`);
});
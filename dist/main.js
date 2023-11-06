"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const router_1 = __importDefault(require("./router"));
const dotenv_1 = require("dotenv");
const client_1 = require("@prisma/client");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
const whitelist = ["http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:3000", "http://127.0.0.1:8000"];
const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/', router_1.default);
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});
exports.prisma = new client_1.PrismaClient({
    log: ["query"]
});
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Eco coding interview server start on port: ${process.env.SERVER_PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var api_1 = require("./routes/api");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", api_1.APIRouter);
exports.default = app;

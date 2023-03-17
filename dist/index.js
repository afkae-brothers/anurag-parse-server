"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const port = process.env.PORT;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.status(200).send('Hello from Home Route');
});
app.get("/hi", (req, res) => {
    res.send("Hello from Hi Route");
});
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});

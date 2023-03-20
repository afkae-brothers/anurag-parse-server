"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const ParseServer = require('parse-server').ParseServer;
const databaseUri = 'mongodb://localhost:27017/?directConnection=true';
if (!databaseUri) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}
const config = {
    databaseURI: databaseUri || 'mongodb://localhost:27017/?directConnection=true',
    //cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || '',
    serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',
    liveQuery: {
        classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
    },
};
const port = process.env.PORT;
const app = (0, express_1.default)();
const mountPath = process.env.PARSE_MOUNT || '/parse';
const api = new ParseServer(config);
app.use(mountPath, api);
app.get("/", (req, res) => {
    res.status(200).send('Hello from Home Route');
});
app.get("/hi", (req, res) => {
    res.send("Hello from Hi Route");
});
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
// app.listen(port, () => {
//     console.log(`now listening on port ${port}`);    
// });

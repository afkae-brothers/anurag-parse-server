import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
const ParseServer = require('parse-server').ParseServer;
const databaseUri = 'mongodb://localhost:27017/?directConnection=true';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}


const config = {
  databaseURI: databaseUri || 'mongodb://localhost:27017/?directConnection=true',
  //cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
};


const port = process.env.PORT;

const app: Express = express();


const mountPath = process.env.PARSE_MOUNT || '/parse';
  const api = new ParseServer(config);
  app.use(mountPath, api);


app.get("/", (req:Request, res:Response) => {
    res.status(200).send('Hello from Home Route');
})


app.get("/hi", (req:Request, res:Response) => {
    res.send("Hello from Hi Route")
})

 const httpServer = require('http').createServer(app);
  httpServer.listen(port, function () {
    console.log('parse-server-example running on port ' + port + '.');
  });
// This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);

// app.listen(port, () => {
//     console.log(`now listening on port ${port}`);    
// });
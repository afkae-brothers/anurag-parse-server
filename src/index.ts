import express from "express";
import ParseServer from "parse-server";
import ParseDashboard from "parse-dashboard";
import { envConfig } from "./utils/config";

const expressApp = express();

const serverURL = `${envConfig.SERVER_HOST}:${envConfig.SERVER_PORT}/parse/server`;

const parseServer = new ParseServer({
  databaseURI: envConfig.DATABASE_URI,
  appId: envConfig.APP_ID,
  masterKey: envConfig.MASTER_KEY,
  serverURL,
});

const startParseServer = async (callback: Function) => {
  try {
    await parseServer.start();
    callback();
  } catch (error) {
    console.log(error)
    throw error;
  }
};

expressApp.use("/parse/server", parseServer.app);

expressApp.use(
  "/parse/dashboard",
  new ParseDashboard({
    apps: [
      {
        appId: envConfig.APP_ID,
        serverURL,
        appName: "Parse Dashboard",
        masterKey: envConfig.MASTER_KEY,
      },
    ],
  })
);

startParseServer(() => {
  expressApp.listen(envConfig.SERVER_PORT, function () {
    console.log(
      "parse-server-example running on port " + envConfig.SERVER_PORT + "."
    );
  });
});

import https from "http";

import ExpressApp from "./app";
import { AppConfig } from "./config/Constants";

const httpServer = https.createServer(ExpressApp);
httpServer.listen(AppConfig.PORT, () =>
    console.log(`The server is running on port ${AppConfig.PORT}`)
);
httpServer.timeout = 120000;


export default httpServer;
import express from "express";
import { log } from "node:console";
import { bootStrap } from "./app.controller";
import {config} from "dotenv";
import { devConfig } from "./config/env/dev.env";
config();
const app = express();
const port = devConfig.PORT;
bootStrap(app, express);
app.listen(port, () => log(`Server running on port ${port}`));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



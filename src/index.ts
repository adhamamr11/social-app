import express from "express";
import { log } from "node:console";
import { bootStrap } from "./app.controller";
import {config} from "dotenv";
import { devConfig } from "./config/env/dev.env";
import schedule from "node-schedule";
import { Post } from "./DB/models/post/post.model";
import { Comment } from "./DB/models/comment/comment.model";

schedule.scheduleJob("2 10 18 * * *",async () => {
    await Post.deleteOne({deletedAt : {$lte : Date.now() - 60 *1000
    }});

    await Comment.deleteOne({deletedAt : {$lte : Date.now() - 60 *1000
    }})

    console.log("deleted users and messages");
})
config();
const app = express();
const port = devConfig.PORT;
bootStrap(app, express);
app.listen(port, () => log(`Server running on port ${port}`));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



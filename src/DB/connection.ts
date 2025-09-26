import mongoose from "mongoose";
import { devConfig } from "../config/env/dev.env";

export async function connectToDB() {

    await mongoose.connect(devConfig.DB_URL!)
    .then(() => console.log("Connected to DB successfully"))
    .catch((e) => console.log("Failed to connect to DB", e));
}
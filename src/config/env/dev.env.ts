import { config } from "dotenv";

config();

export const devConfig = {
    PORT: process.env.PORT,
DB_URL: process.env.DB_URL,
USER_EMAIL : process.env.USER_EMAIL,
USER_PASS :process.env.USER_PASS,

SECRET_JWT : process.env.SECRET_JWT

};
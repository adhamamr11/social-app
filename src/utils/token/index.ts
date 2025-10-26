import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { devConfig } from "../../config/env/dev.env";


export const generateToken = ({payload,secretKey = devConfig.SECRET_JWT,options}:{payload:object,secretKey?:string,options?:SignOptions})=>{
    return jwt.sign(payload,secretKey!,options);
}

export const verifyToken = (token:string,secretKey?:string)=>{
    return jwt.verify(token,secretKey) as JwtPayload
}
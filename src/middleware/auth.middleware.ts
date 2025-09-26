import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/token";
import { devConfig } from "../config/env/dev.env";
import { UserRepo } from "../DB/models/user/user.repo";
import { UnauthorizedException } from "../utils/error";

export const IsAuthenticated = ()=>{
    return async(req :Request,res :Response,next : NextFunction)=>{

        const token = req.headers.authorization;
        const payload = verifyToken(token,devConfig.SECRET_JWT);
        
        const userRepo = new UserRepo();

        const user = await userRepo.exist({_id : payload._id}) ;

        if(!user) throw new UnauthorizedException("User not found");

        req.user = user;
        next();
    }
}
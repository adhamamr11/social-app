import { verifyToken } from "../utils/token";
import { devConfig } from "../config/env/dev.env";
import { UserRepo } from "../DB/models/user/user.repo";
import { BadRequestException, UnauthorizedException } from "../utils/error";

export const IsAuthenticatedGraphQl =  async(context)=>{

        const token = context.accessToken;
        const payload = verifyToken(token,devConfig.SECRET_JWT);
        
        const userRepo = new UserRepo();

        const user = await userRepo.exist({_id : payload._id},{},{populate: [{path : "friends",select : "firstName lastName fullName"}]}); ;

        if(!user) throw new UnauthorizedException("User not found");

        if(user.credentialUpdatedAt > new Date()) throw new BadRequestException("token expired");

        context.user = user;
    }

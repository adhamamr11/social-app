import { NextFunction, type Request, type Response } from "express";
import { LoginDTO, RegisterDTO, VerifyAccDTO } from "./auth.dto";
import {ConflictException, ForbiddenException } from "../../utils/error";
import { UserRepo } from "../../DB/models/user/user.repo";
import { AuthFactory } from "./factory";
import { AuthProvider } from "./providers/auth.provider";
import { comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/token";

class AuthService{
    private userRepo = new UserRepo();
    private authFactory = new AuthFactory();
    constructor(){}

    register = async(req:Request,res : Response)=>{
        const registerDTO : RegisterDTO = req.body;

        const userExist = await this.userRepo.exist({email : registerDTO.email});

        if(userExist){
            throw new ConflictException("User already exists");
        }

        const user = await this.authFactory.register(registerDTO);

        const createdUser = await this.userRepo.create(user);

        return res.status(201).json({message:"User created successfully",success:true,data:createdUser});
    }

    verifyAcc = async(req: Request,res : Response)=>{

        const verifyAccDTO:VerifyAccDTO = req.body;
        await AuthProvider.checkOTP(verifyAccDTO);
        await this.userRepo.update({email : verifyAccDTO.email},{$unset : {otp : "",otpExpiryAt :""},isVerified : true});

        return res.sendStatus(204);
    }

    login = async(req : Request,res : Response)=>{

        const loginDTO : LoginDTO= req.body;

        const userExist = await this.userRepo.exist({email : loginDTO.email});

        if(!userExist) throw new ForbiddenException("invalid credentials");

        if(!await comparePassword(loginDTO.password,userExist.password!)) throw new ForbiddenException("invalid credentials");

        const accessToken = generateToken({payload : {_id : userExist._id,role: userExist.role},options:{expiresIn : "1d"}});

        return res.status(200).json({message : "User login successfully", success : true,data : {accessToken}})
    }
}

export default new AuthService();

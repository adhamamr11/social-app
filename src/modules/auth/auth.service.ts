import { type Request, type Response } from "express";
import { Confirm2StepVerification as confirm2StepVerification, Confirm2StepVerification, ConfirmEmailDTO, LoginDTO, RegisterDTO, twoStepVerificationDTO, updateEmailDTO, UpdatePassDTO, VerifyAccDTO } from "./auth.dto";
import {BadRequestException, ConflictException, ForbiddenException, NotFoundException } from "../../utils/error";
import { UserRepo } from "../../DB/models/user/user.repo";
import { AuthFactory } from "./factory";
import { AuthProvider } from "./providers/auth.provider";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateToken } from "../../utils/token";
import { generateExpiryTime, generateOTP } from "../../utils/otp";
import { sendMail } from "../../utils/email";


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

        await this.userRepo.create(user);

        return res.status(201).json({message:"User created successfully",success:true});
    }

    verifyAcc = async(req: Request,res : Response)=>{

        const verifyAccDTO:VerifyAccDTO = req.body;
        
        const userExist = await this.userRepo.exist({email : verifyAccDTO.email});
        
        if(!userExist) throw new NotFoundException("User Not Found");
         AuthProvider.checkOTP(verifyAccDTO,userExist);
        await this.userRepo.update({email : verifyAccDTO.email},{$unset : {otp : "",otpExpiryAt :""},isVerified : true});

        return res.sendStatus(204);
    }

    login = async(req : Request,res : Response)=>{

        const loginDTO : LoginDTO= req.body;

        const userExist = await this.userRepo.exist({email : loginDTO.email});

        if(!userExist) throw new ForbiddenException("invalid credentials");

        if(!await comparePassword(loginDTO.password,userExist.password!)) throw new ForbiddenException("invalid credentials");

        if(userExist.twoStepVrification){
            const result = await this.userRepo.findAndUpdate({email:userExist.email},
                {otp:generateOTP(),otpExpiryAt:generateExpiryTime(5)}
            ,{new:true})
            sendMail({to:userExist.email,html:`<h1> your otp is ${result.otp} </h1>`});
            return res.status(200).json({message : "Check Your Email"});
        }

        const accessToken = generateToken({payload : {_id : userExist._id,role: userExist.role},options:{expiresIn : "1d"}});

        return res.status(200).json({message : "User login successfully", success : true,data : {accessToken}})
    }

    updatePassOTP = async (req:Request,res :Response) => {
        const result = await this.userRepo.findAndUpdate({_id :req.user._id},{otp : generateOTP(),otpExpiryAt:generateExpiryTime(5)},{new :true});
        sendMail({to : req.user.email,html : `<h1>your otp is ${result.otp}</h1>`});

         return res.status(200).json({message : "Check Your Email"});
    }

    updatePass = async (req:Request,res : Response) => {
        const updatePassDTO : UpdatePassDTO = req.body;

        AuthProvider.checkOTP(updatePassDTO,req.user);

        await this.userRepo.update({_id : req.user._id},{password : await hashPassword(updatePassDTO.password),
            $unset : {otp : "",otpExpiryAt :""},credentialUpdatedAt : Date.now()});

        return res.status(200).json ({success :true,massage :"Password updated successfully"});
        
    }


     updateEmailOTP = async (req : Request,res : Response) => {

        const updateEmailDTO :updateEmailDTO = req.body;

        const result = await this.userRepo.findAndUpdate({_id : req.user._id},
            {email : updateEmailDTO.email,
                otp : generateOTP(),
                otpExpiryAt : generateExpiryTime(5),
                isVerified : false
            },{new : true});

        await sendMail({to : result.email,html : `<h1>your otp is ${result.otp}</h1>`});

        return res.status(200).json({message : "Check Your Email"});
    }   


    confirmEmail = async (req : Request,res : Response) => {

        const confirmEmailDTO : ConfirmEmailDTO = req.body;

        AuthProvider.checkOTP(confirmEmailDTO,req.user);

        if(confirmEmailDTO.email != req.user.email) throw new BadRequestException("invalid email")

        await this.userRepo.update({_id : req.user._id},{$unset : {otp : "",otpExpiryAt:""},isVerified : true});

         return res.status(200).json({success : true , message : "Email updated successfully"});
    }

    twoStepVerification = async (req : Request,res : Response) => {

        const twoStepVerificationDTO : twoStepVerificationDTO = req.body;

        const result = await this.userRepo.findAndUpdate({email : twoStepVerificationDTO.email},
            {otp : generateOTP(),otpExpiryAt:generateExpiryTime(5)},{new :true});

            await sendMail({to : result.email,html : `<h1>your otp is ${result.otp}</h1>`});

            return res.status(200).json({message : "Check Your Email"});
    }


    confirm2StepVerification = async (req : Request,res : Response) => {

        const confirm2StepVerification : confirm2StepVerification = req.body;

        const user = await this.userRepo.find({email: confirm2StepVerification.email})

        AuthProvider.checkOTP(confirm2StepVerification,user);

        await this.userRepo.update({email : confirm2StepVerification.email},{$unset : {otp : "",otpExpiryAt:""},twoStepVrification : true});

         return res.status(200).json({success : true , message : "2 step verification confirmed"});
    }
    

    loginConfirmation = async (req : Request,res : Response) => {
        
        const confirm2StepVerification : Confirm2StepVerification = req.body;

        const user = await this.userRepo.find({email:confirm2StepVerification.email});

        AuthProvider.checkOTP(confirm2StepVerification,user);

        await this.userRepo.update({email : confirm2StepVerification.email},{$unset : {otp : "",otpExpiryAt:""}});

        const accessToken = generateToken({payload : {_id : user._id,role: user.role},options:{expiresIn : "1d"}});

        return res.status(200).json({success : true,message :"user login successfully",data :{accessToken}});

    }
}

export default new AuthService();

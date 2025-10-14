import { GENDER } from "../../utils/common/enum";

export interface RegisterDTO{
    fullName?:string;
    email:string;
    password?:string;
    phoneNumber?:string;
    gender?:GENDER;
}

export interface VerifyAccDTO{
    email : string,
    otp : string
}

export interface LoginDTO{
    email : string,
    password : string
}

export interface UpdatePassDTO{
    otp : string,
    password : string
}

export interface updateEmailDTO{
    email : string;
}

export interface ConfirmEmailDTO{
    email: string,
    otp : string
}

export interface twoStepVerificationDTO{
    email : string
}

export interface Confirm2StepVerification{

    email: string,
    otp : string
}
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
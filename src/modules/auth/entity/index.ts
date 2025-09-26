import { GENDER,ROLE,USER_AGENT } from "../../../utils/common/enum";


export class UserEntity{

public firstName !:string;
public lastName !:string;
public fullName !:string;
public email !:string;
public password !:string;
public phoneNumber !:string;
public gender!:GENDER;
public role!:ROLE;
public userAgent!:USER_AGENT;
public otp!:string;
public otpExpiryAt!:Date;
public credentialUpdatedAt!:Date;
public isVerified!:boolean;
}
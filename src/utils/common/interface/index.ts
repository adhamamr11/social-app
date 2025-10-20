import { ObjectId } from "mongoose";
import { GENDER, REACTION, ROLE, STATUS, USER_AGENT } from "../enum";

export interface IUser{
    firstName:string;
    lastName:string;
    fullName?:string;
    email :string;
    password?:string;
    phoneNumber?:string;
    gender?:GENDER;
    role?:ROLE;
    userAgent?:USER_AGENT;
    otp?:string;
    otpExpiryAt?:Date;
    credentialUpdatedAt?:Date;
    isVerified?:boolean;
    twoStepVrification ?: false;
    blocks ?: ObjectId[]
}

export interface IUser{
    _id : ObjectId
}

export interface IReaction{
    userId : ObjectId,
    reaction : REACTION
}

export interface IPOST{
    _id : ObjectId,
    userId:ObjectId,
    content :string,
    reactions: IReaction[],
    attachments? : IAttachment[],
    mentions? : ObjectId[],
    deletedAt ?:Date
}

export interface IAttachment{
    url : string,
    id: string
}

export interface IComment{
    _id : ObjectId
    userId : ObjectId,
    postId : ObjectId,
    content : string,
    parentId : ObjectId,
    reactions : IReaction[],
    attachments ?: IAttachment[],
    deletedAt ?: Date
}

export interface IfriendShip{
    requestTo : ObjectId,
    requestFrom : ObjectId,
    status : STATUS
}


declare module "express" {
    interface Request {
        user : IUser
    }
}

declare module "jsonwebtoken" {
    interface JwtPayload{
        _id : ObjectId,
        role : ROLE
    }
}
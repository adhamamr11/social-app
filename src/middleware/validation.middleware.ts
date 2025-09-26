import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../utils/error";

export function isValid(schema:ZodType) {
    return (req:Request,res:Response,next:NextFunction)=>{
        let data = {...req.body,...req.query,...req.params}
        const result = schema.safeParse(data);
        if(!result.success){
            let errMessages = result.error.issues.map((issue)=>({
                path : issue.path,
                message : issue.message
            }))
            throw new BadRequestException(result.error.message,errMessages);
        }
        next();
    }
    
}
import { ZodType } from "zod";
import { BadRequestException } from "../utils/error";

export function isValidGraphQl(schema:ZodType,args) {

        const result = schema.safeParse(args);
        if(!result.success){
            let errMessages = result.error.issues.map((issue)=>({
                path : issue.path,
                message : issue.message
            }))
            throw new BadRequestException(JSON.stringify(errMessages));
        }
    
}
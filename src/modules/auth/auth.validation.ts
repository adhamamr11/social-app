import {z} from "zod";
import { GENDER } from "../../utils/common/enum";
import { LoginDTO, RegisterDTO, VerifyAccDTO } from "./auth.dto";

export const registerShcema = z.object<RegisterDTO>({
    fullName : z.string().min(3).max(30) as unknown as string,
    email : z.email() as unknown as string,
    password : z.string().min(6).max(30) as unknown as string,
    phoneNumber : z.string().min(11).max(11) as unknown as string,
    gender : z.enum(GENDER) as unknown as GENDER,
});


export const VerifyAccShcema = z.object<VerifyAccDTO>({
    email : z.email() as unknown as string,
    otp : z.string().length(6) as unknown as string
})


export const LoginSchema = z.object<LoginDTO>({
    email : z.email() as unknown as string,
    password : z.string().min(6).max(30) as unknown as string,
})

import z from "zod";
import {UpdateInfoDTO } from "./user.dto";

export const updateInfoSchema = z.object<UpdateInfoDTO>({
    firstName : z.string().min(3).max(30).optional() as unknown as string,
    lastName : z.string().min(3).max(30).optional() as unknown as string,
    phoneNumber : z.string().min(11).max(11).optional() as unknown as string,
});

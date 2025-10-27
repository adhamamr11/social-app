import mongoose from "mongoose";
import z from "zod";

export const getPostSchema = z.object({ id : z.string().refine((val)=> mongoose.Types.ObjectId.isValid(val),{message :" invalid objectId format" })})
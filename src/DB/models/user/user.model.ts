import { model } from "mongoose";
import {IUser} from "../../../utils/common/interface";
import { userschema } from "./user.schema";


export const User = model<IUser>("User",userschema);
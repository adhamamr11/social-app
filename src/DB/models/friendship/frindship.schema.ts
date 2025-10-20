import { Schema } from "mongoose"
import { IfriendShip } from "../../../utils/common/interface"
import { STATUS } from "../../../utils/common/enum"

export const friendShipSchema = new Schema<IfriendShip>({

    requestFrom :{type : Schema.ObjectId,ref : "User"},
    requestTo : {type : Schema.ObjectId,ref :"User"},
    status : {type : Number,enum : STATUS,default :STATUS.PENDING}

},{timestamps : true});
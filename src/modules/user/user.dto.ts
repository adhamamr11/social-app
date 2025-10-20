import { ObjectId } from "mongoose";
import { STATUS } from "../../utils/common/enum";

export interface UpdateInfoDTO {
    firstName?:string;
    lastName?:string;
    phoneNumber?:string;
}

export interface ResponseToFriendRequestDTO{
    requestId : ObjectId;
    response : STATUS;
}
import { Request, Response } from "express";
import { ChatRepo } from "../../DB/models/chat/chat.repo";
import { UserRepo } from "../../DB/models/user/user.repo";
import { NotFoundException } from "../../utils/error";


class ChatService {

    private readonly chatRepo = new ChatRepo();
    private readonly userRepo = new UserRepo();

    get = async (req:Request,res:Response) => {
        
        const user = await this.userRepo.exist({ _id: req.params.userId });
        if (!user) throw new NotFoundException("User not found");

        const chat = await this.chatRepo.find({users :{ $all : [user.id,req.user._id]}},{},{populate:[{path : "messages"}]});
        return res.status(200).json({success : true,data :{chat}})
    
    }
}

export default new ChatService();
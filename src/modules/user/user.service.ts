import { Request, Response } from "express";
import { UserRepo } from "../../DB/models/user/user.repo";
import { UserFactory } from "./factory";
import { UpdateInfoDTO } from "./user.dto";

class UserService{
   private readonly  userRepo = new UserRepo();
   private readonly userFactory = new UserFactory();
    
    updateInfo = async (req : Request,res : Response) => {

        const updateInfoDTO : UpdateInfoDTO = req.body;

        const result = this.userFactory.updateInfo(updateInfoDTO,req.user);

        await this.userRepo.findAndUpdate({_id : req.user._id},{firstName : result.firstName,lastName : result.lastName,phoneNumber : result.phoneNumber});

        return res.sendStatus(204);
    }

}

export default new UserService();
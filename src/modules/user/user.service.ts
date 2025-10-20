import { Request, Response } from "express";
import { UserRepo } from "../../DB/models/user/user.repo";
import { UserFactory } from "./factory";
import { ResponseToFriendRequestDTO, UpdateInfoDTO } from "./user.dto";
import { FriendShipRepo } from "../../DB/models/friendship/friendship.repo";
import { NotFoundException } from "../../utils/error";
import { STATUS } from "../../utils/common/enum";
import { FilterQuery } from "mongoose";
import { IfriendShip } from "../../utils/common/interface";

class UserService {
    private readonly userRepo = new UserRepo();
    private readonly userFactory = new UserFactory();
    private readonly friendShipRepo = new FriendShipRepo();

    updateInfo = async (req: Request, res: Response) => {

        const updateInfoDTO: UpdateInfoDTO = req.body;

        const result = this.userFactory.updateInfo(updateInfoDTO, req.user);

        await this.userRepo.findAndUpdate({ _id: req.user._id }, { firstName: result.firstName, lastName: result.lastName, phoneNumber: result.phoneNumber });

        return res.sendStatus(204);
    }


    friendShipRequest = async (req: Request, res: Response) => {

        const { requestTo } = req.body;

        const user = await this.userRepo.exist({ _id: requestTo });
        if (!user) throw new NotFoundException("User not found");

        const result = await this.friendShipRepo.find({requestFrom: req.user._id, requestTo});
        if(result){ 
            
        await this.friendShipRepo.delete({requestFrom: req.user._id, requestTo});

        return res.status(200).json({ success: true, message: "FriendShip request canceled successfully" });}

        await this.friendShipRepo.create({ requestFrom: req.user._id, requestTo });


        return res.status(200).json({ success: true, message: "FriendShip request sent successfully" });
    }

    listFriendRequests = async (req: Request, res: Response) => {

        const { status } = req.body;

        const user = req.user._id;

        const filter: FilterQuery<IfriendShip> = { status: status ? status : STATUS.PENDING }

        if (filter.status == STATUS.ACCEPTED) filter.$or = [{ requestTo: user }, { requestFrom: user }]
        else filter.requestTo = user;

        const requests = await this.friendShipRepo.findAll(filter, {},
            { populate: [{ path: "requestTo", select: "firstName lastName fullName" }, { path: "requestFrom", select: "firstName lastName fullName" }] })

        return res.status(200).json({ success: true, requests });
    }

    responseToFriendRequest = async (req: Request, res: Response) => {

        const responseToFriendRequestDTO: ResponseToFriendRequestDTO = req.body;

        const request = await this.friendShipRepo.findAndUpdate({ _id: responseToFriendRequestDTO.requestId, requestTo: req.user._id, status: STATUS.PENDING }
            , { status: responseToFriendRequestDTO.response }, { new: true });

        return res.status(200).json({ success: true, request });
    }

    blockUser = async (req : Request,res : Response) => {

        const {id} = req.params;

        const user = await this.userRepo.exist({_id: id});
        if(!user) throw new NotFoundException("User not found");

        await this.userRepo.update({_id : req.user._id},{blocks: id});


        return res.status(200).json({ success: true, message :"user blocked successfully " });
    }
}


export default new UserService();
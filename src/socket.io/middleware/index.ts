import { Socket } from "socket.io";
import { verifyToken } from "../../utils/token";
import { UserRepo } from "../../DB/models/user/user.repo";
import { NotFoundException } from "../../utils/error";

export const socketAuth = async(socket :Socket ,next:Function)=>{
        try {
        const {authorization} = socket.handshake.auth;
        const payload = verifyToken(authorization);
        const userRepo = new UserRepo();
        const user= await userRepo.exist({_id : payload._id});
        if(!user) throw new NotFoundException("User not found")
        socket.data.user = user;
        next()
        } catch (error) {
            next(error);
        }
    }
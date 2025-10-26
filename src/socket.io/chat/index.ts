import { Server, Socket } from "socket.io";
import { MessageRepo } from "../../DB/models/message/message.repo";
import { ChatRepo } from "../../DB/models/chat/chat.repo";

export const sendMessage = (connectedUsers: Map<string, string>, socket: Socket, io: Server) => {

    return async (data: { message: string, destId: string }) => {

        const destSocket = connectedUsers.get(data.destId)
        socket.emit("successMessage", data);
        io.to(destSocket).emit("receiveMessage", data);

        const messageRepo = new MessageRepo();
        const chatRepo = new ChatRepo();

        const sender = socket.data.user.id;

        const createdMessage = await messageRepo.create({content : data.message,sender});

        const chat = await chatRepo.exist({users : {$all : [sender,data.destId]}});

        if(!chat){
            await chatRepo.create({messages : [createdMessage.id],users : [sender,data.destId]})
        }else {
            await chatRepo.update({_id : chat.id},{$push : {messages : [createdMessage.id]}})
        }
    }
}
import {Server as httpServer} from "node:http";
import { Server, Socket } from "socket.io"
import { socketAuth } from "./middleware";
import { sendMessage } from "./chat";



export const initSocket = (server: httpServer)=>{

    const connectedUsers = new Map<string,string> () 
    const io = new Server(server ,{cors :{origin : "*",methods : "*"}})
    

    io.use(socketAuth)

    io.on("connection",async (socket : Socket)=>{
        connectedUsers.set(socket.data.user.id,socket.id);
        console.log("New user connected:", socket.id);
        console.log(connectedUsers);
        socket.on("sendMessage",sendMessage(connectedUsers,socket,io))

        
    })
}

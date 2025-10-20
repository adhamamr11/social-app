import {NextFunction, Request, Response, type Express} from "express";
import {connectToDB} from "./DB/connection";
import {authRouter} from "./modules/auth/auth.controller";
import { AppError } from "./utils/error";
import postRouter from "./modules/post/post.controller";
import commentRouter from "./modules/comment/comment.controller";
import userRouter from "./modules/user/user.controller";
export function bootStrap(app :Express,express : any) {
    app.use(express.json());

    connectToDB();

    app.use("/auth",authRouter);
    app.use("/post",postRouter);
    app.use("/comment",commentRouter);
    app.use("/user",userRouter)

    app.use("/{*dummy}",(req: Request,res : Response,next : NextFunction)=>{
        return res.status(404).json({message:"Not Found",success:false});
    })


    app.use((err : AppError,req : Request,res : Response,next : NextFunction)=>{
        return res.status(err.statusCode || 500).json({message:err.message,success:false,errorDetails:err.errorDetails,stack :err.stack});
    })
}
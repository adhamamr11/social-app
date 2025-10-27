import {NextFunction, Request, Response, type Express} from "express";
import {connectToDB} from "./DB/connection";
import {authRouter} from "./modules/auth/auth.controller";
import { AppError } from "./utils/error";
import postRouter from "./modules/post/post.controller";
import commentRouter from "./modules/comment/comment.controller";
import userRouter from "./modules/user/user.controller";
import cors from "cors";
import { createHandler } from "graphql-http/lib/use/express"; 
import chatRouter from "./modules/chat/chat.controller";
import { appSchema } from "./app.schema";
import { GraphQLError } from "graphql";
export function bootStrap(app :Express,express : any) {
    app.use(express.json());

    connectToDB();

    app.use(cors({origin :"*"}));

    app.use("/auth",authRouter);
    app.use("/post",postRouter);
    app.use("/comment",commentRouter);
    app.use("/user",userRouter);
    app.use("/chat",chatRouter);
    app.use("/graphql",createHandler({schema : appSchema,
        formatError : (error : GraphQLError)=>{
        return {
            message : error.message,
            success : false,
            path : error.path,
            detials : error.originalError
        } as unknown as GraphQLError
    },context : (req)=>{
        const accessToken = req.headers["authorization"];
        return {
            accessToken
        }
    }}))

    app.use("/{*dummy}",(req: Request,res : Response,next : NextFunction)=>{
        return res.status(404).json({message:"Not Found",success:false});
    })


    app.use((err : AppError,req : Request,res : Response,next : NextFunction)=>{
        return res.status(err.statusCode || 500).json({message:err.message,success:false,errorDetails:err.errorDetails,stack :err.stack});
    })
}
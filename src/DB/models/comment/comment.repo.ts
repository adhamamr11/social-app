import { IComment } from "../../../utils/common/interface";
import { AbstractRepo } from "../../abstract.repo";
import { Comment } from "./comment.model";


export class CommentRepo extends AbstractRepo<IComment>{
    constructor(){
        super(Comment)
    }
}
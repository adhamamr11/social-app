import { IPOST } from "../../../utils/common/interface";
import { AbstractRepo } from "../../abstract.repo";
import { Post } from "./post.model";

export class PostRepo extends AbstractRepo<IPOST>{
    constructor(){
        super(Post);
    }
}
import { IChat} from "../../../utils/common/interface";
import { AbstractRepo } from "../../abstract.repo";
import { Chat } from "./chat.model";

export class ChatRepo extends AbstractRepo<IChat>{
    constructor(){
        super(Chat)
    }
}
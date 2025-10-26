import { IMessage } from "../../../utils/common/interface";
import { AbstractRepo } from "../../abstract.repo";
import { Message } from "./message.model";

export class MessageRepo extends AbstractRepo<IMessage>{
    constructor(){
        super(Message)
    }
}
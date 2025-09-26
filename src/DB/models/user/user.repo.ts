import { IUser } from "../../../utils/common/interface";
import { AbstractRepo } from "../../abstract.repo";
import { User } from "./user.model";

export class UserRepo extends AbstractRepo<IUser>{
    constructor(){
        super(User);
    }
}
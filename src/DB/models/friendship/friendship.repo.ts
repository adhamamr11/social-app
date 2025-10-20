import { IfriendShip } from "../../../utils/common/interface";
import { AbstractRepo } from "../../abstract.repo";
import { FriendShipModel } from "./friendship.model";


export class FriendShipRepo extends AbstractRepo<IfriendShip>{
    constructor(){
        super(FriendShipModel);
    }
}
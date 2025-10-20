import { model } from "mongoose";
import { friendShipSchema } from "./frindship.schema";

export const FriendShipModel = model("FriendShip",friendShipSchema);
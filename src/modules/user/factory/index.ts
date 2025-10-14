import { IUser } from "../../../utils/common/interface";
import { UserEntity } from "../entity";
import { UpdateInfoDTO } from "../user.dto";


export class UserFactory {

    updateInfo(updateInfoDTO : UpdateInfoDTO,user : IUser){
        const entity = new UserEntity();

        entity.firstName = updateInfoDTO.firstName ?? user.firstName,
        entity.lastName = updateInfoDTO.lastName ?? user.lastName,
        entity.phoneNumber = updateInfoDTO.phoneNumber ?? user.phoneNumber 

        return entity
    }
}
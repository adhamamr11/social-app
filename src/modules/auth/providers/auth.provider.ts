
import { IUser } from "../../../utils/common/interface";
import { BadRequestException } from "../../../utils/error";
import { UpdatePassDTO, VerifyAccDTO } from "../auth.dto";

export const AuthProvider = {

    checkOTP(DTO : VerifyAccDTO | UpdatePassDTO ,user : IUser){

        if(DTO.otp != user.otp) throw new BadRequestException("Invalid otp");

        if(user.otpExpiryAt! < new Date()) throw new BadRequestException("otp expired");
    }
}
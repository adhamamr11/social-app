import { UserRepo } from "../../../DB/models/user/user.repo";
import { BadRequestException, NotFoundException } from "../../../utils/error";
import { VerifyAccDTO } from "../auth.dto";

export const AuthProvider = {

   async checkOTP(verifyAccDTO : VerifyAccDTO){
        const userRepo = new UserRepo();

        const userExist = await userRepo.exist({email : verifyAccDTO.email});

        if(!userExist) throw new NotFoundException("User Not Found");

        if(verifyAccDTO.otp != userExist.otp) throw new BadRequestException("Invalid otp");

        if(userExist.otpExpiryAt! < new Date()) throw new BadRequestException("otp expired");
    }
}
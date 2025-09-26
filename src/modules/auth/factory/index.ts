import { RegisterDTO } from "../auth.dto";
import { GENDER, ROLE, USER_AGENT } from "../../../utils/common/enum";
import { UserEntity } from "../entity";
import { generateExpiryTime, generateOTP } from "../../../utils/otp";
import { hashPassword } from "../../../utils/hash";

 export class AuthFactory{
    private user = new UserEntity();

    async register(registerDTO : RegisterDTO){
        this.user.fullName = registerDTO.fullName !;
        this.user.email = registerDTO.email!;
        this.user.password = await hashPassword(registerDTO.password!);
        this.user.phoneNumber = registerDTO.phoneNumber!;
        this.user.gender = registerDTO.gender as GENDER;
        this.user.role = ROLE.USER;
        this.user.userAgent = USER_AGENT.LOCAL;
        this.user.otp = generateOTP();
        this.user.otpExpiryAt = generateExpiryTime(5);
        this.user.credentialUpdatedAt = new Date();
        this.user.isVerified = false;
        return this.user;   
    }
     }
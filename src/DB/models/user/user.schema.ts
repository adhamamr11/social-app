import {Schema} from "mongoose";  
import {IUser} from "../../../utils/common/interface";
import { GENDER, ROLE, USER_AGENT } from "../../../utils/common/enum";
import { sendMail } from "../../../utils/email";
export const userschema = new Schema<IUser>({
firstName:{type:String,required:true,trim:true,minlength:3,maxlength:30},
lastName:{type:String,required:true,trim:true,minlength:3,maxlength:30},
email :{type:String,required:true,unique:true,trim:true,lowercase:true},
password:{type:String,required:function(){
    if(this.userAgent==USER_AGENT.LOCAL){
        return true;
    }
    return false;
}},
phoneNumber:{type:String},
gender:{type:Number,enum:GENDER,default:GENDER.MALE},
role:{type:Number,enum:ROLE,default:ROLE.USER},
userAgent:{type:Number,enum:USER_AGENT,default:USER_AGENT.LOCAL},
otp:{type:String},
otpExpiryAt:{type:Date},
credentialUpdatedAt:{type:Date},
isVerified:{type:Boolean,default : false},
twoStepVrification : {type : Boolean,default:false},
blocks : [{type : Schema.ObjectId,ref:"User"}],
friends : [{type : Schema.ObjectId,ref:"User"}]
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

userschema.virtual("fullName").get(function(){
    return this.firstName+" "+this.lastName;
});

userschema.virtual("fullName").set(function(value){

    const [firstName,lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
});

userschema.pre("save", async function(){
    if(this.userAgent != USER_AGENT.GOOGLE && this["isNew"] == true)
    await sendMail({to : this.email,subject :"Confirm Email",html : `<h1>your otp is ${this.otp}</h1>`});
})
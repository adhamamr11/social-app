import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/sendmail-transport"
import { devConfig } from "../../config/env/dev.env"


export const sendMail = async (mailOptions : MailOptions)=>{
    const transporter= nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : devConfig.USER_EMAIL,
            pass :devConfig.USER_PASS
        }
    })
    mailOptions.from = `Social-App<${devConfig.USER_EMAIL}>`;
   await transporter.sendMail(mailOptions)
}
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}
    async sendEmail(email: string, subject: string, confirmationCode: string) {
        try {
            await this.mailerService.sendMail({
                from: '"RUSEL" <heeca@mail.ru>', // sender address
                to: email,
                subject: subject,
                html: `<table style="margin:0 auto;" >
                        <tr>
                              <h3 style="text-align: center">Thank for your registration</h3>
                        </tr>
                        <tr>
                        <img class="img" 
                         style="margin: 0 auto; 
                         display: block;
                         width: 150px;
                         height:150px"
                         src="https://img.freepik.com/premium-vector/ready-use-animated-design-media-content_9206-3956.jpg?w=2000"/>
                         </tr>
                         <tr style="text-align: center;">
                         <p 
                         style="font-size: 20px;
                         text-align: center">
                         Please click on the button below to verify your email</p>
                          </tr>
                         <tr style="align-items: center">
                         <a href='https://frontend-monorepo-mirror-workshop.vercel.app/auth/registration/registration-confirmation?code=${confirmationCode}' 
                            style="
                            margin-top:10px;
                            background-color:#5571e9;
                            text-decoration:none;
                            padding: 10px;
                            border-radius: 5px;
                            color: white;
                            text-align: center;
                            width: 250px;
                             margin: 0 auto; 
                         display: block;
                         ">
                          Confirm your email
                        </a>
                        </tr>
                        
           </table>`,
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    async sendMailRecoveryPasswordCode(email: string, subject: string, NewRecoveryCode: string) {
        try {
            await this.mailerService.sendMail({
                from: '"RUSEL" <heeca@mail.ru>', // sender address
                to: email,
                subject: subject,
                html: `<table style="margin:0 auto;" >
                        <tr>
                              <h3 style="text-align: center">Recovery password</h3>
                        </tr>
                        <tr>
                        <img class="img" 
                         style="margin: 0 auto; 
                         display: block;
                         width: 150px;
                         height:150px"
                         src="https://img.freepik.com/premium-vector/ready-use-animated-design-media-content_9206-3956.jpg?w=2000"/>
                         </tr>
                         <tr style="text-align: center;">
                         <p 
                         style="font-size: 20px;
                         text-align: center">
                         Please click on the button below to verify your email</p>
                          </tr>
                         <tr style="align-items: center">
                         <a href='https://frontend-monorepo-mirror-workshop.vercel.app/auth/new-password?code=${NewRecoveryCode}' 
                            style="
                            margin-top:10px;
                            background-color:#5571e9;
                            text-decoration:none;
                            padding: 10px;
                            border-radius: 5px;
                            color: white;
                            text-align: center;
                            width: 250px;
                             margin: 0 auto; 
                         display: block;
                         ">
                          Confirm your email
                        </a>
                        </tr>
                        
           </table>`,
            });
            return true;
        } catch (e) {
            return false;
        }
    }
}
//  <a href='https://frontend-monorepo-mirror-workshop.vercel.app/auth/registration/registration-confirmation?code=${confirmationCode}'>complete registration</a>
//  <a href='https://frontend-monorepo-mirror-workshop.vercel.app/auth/new-password?code=${NewRecoveryCode}'>recovery password</a>

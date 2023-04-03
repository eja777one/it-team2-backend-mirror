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
                html: `<h1>Thank for your registration</h1>
                        <p>To finish registration please follow the link below: eto cod => ${confirmationCode} a eto net =>
                             <a href='${confirmationCode}'>complete registration</a>
                        </p>`,
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
                html: `<h1>Thank for your registration</h1>
                        <p>To finish registration please follow the link below: eto cod =>  ${NewRecoveryCode} a eto net =>
                                 <a href='${NewRecoveryCode}'>recovery password</a>
                        </p>`,
            });
            return true;
        } catch (e) {
            return false;
        }
    }
}

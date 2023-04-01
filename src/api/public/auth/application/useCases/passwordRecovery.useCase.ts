import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';
import { PasswordRecoveryInputModelType } from '../../dto/passwordRecovery.dto';
import { randomUUID } from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { EmailService } from '../../../../../common/helpers/email/email.service';

export class PasswordRecoveryCodeCommand {
    constructor(public inputModel: PasswordRecoveryInputModelType) {}
}

@CommandHandler(PasswordRecoveryCodeCommand)
export class PasswordRecoveryCodeUseCase implements ICommandHandler<PasswordRecoveryCodeCommand> {
    constructor(protected usersRepository: UserRepository, protected emailService: EmailService) {}
    async execute(command: PasswordRecoveryCodeCommand) {
        const user = await this.usersRepository.getUserByEmail(command.inputModel.email);
        if (!user) throw new BadRequestException([{ message: 'Incorrect recoveryCode', field: 'recoveryCode' }]);
        const NewRecoveryCode = randomUUID();
        await this.usersRepository.updateUserRecoveryPasswordCodeByEmail(command.inputModel.email, NewRecoveryCode);
        await this.emailService.sendMailRecoveryPasswordCode(command.inputModel.email, 'RecoveryPassword', NewRecoveryCode);
        return true;
    }
}
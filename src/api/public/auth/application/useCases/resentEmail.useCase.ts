import { EmailInputModelType } from '../../dto/login.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EmailService } from '../../../../../common/helpers/email/email.service';
import { randomUUID } from 'crypto';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';
import { BadRequestException } from '@nestjs/common';

export class resentEmailCommand {
    constructor(public inputModel: EmailInputModelType) {}
}

@CommandHandler(resentEmailCommand)
export class resentEmailUseCase implements ICommandHandler<resentEmailCommand> {
    constructor(protected emailService: EmailService, protected usersRepository: UserRepository) {}
    async execute(command: resentEmailCommand) {
        const newConfirmationCode = randomUUID();
        const updateUserConfirmCodeByEmail = await this.usersRepository.updateUserConfirmationCodeByEmail(command.inputModel.email, newConfirmationCode);
        if (updateUserConfirmCodeByEmail) {
            const sendEmail = await this.emailService.sendEmail(command.inputModel.email, 'Resending', newConfirmationCode);
            return sendEmail;
        } else
            throw new BadRequestException([
                {
                    message: 'Incorrect Email',
                    field: 'email',
                },
            ]);
    }
}

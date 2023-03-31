import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';

export class LoginCommand {
    constructor(public inputModel: '') {}
}

@CommandHandler(LoginCommand)
export class createUserUseCase implements ICommandHandler<LoginCommand> {
    constructor(protected usersRepository: UserRepository) {}
    async execute(command: LoginCommand) {}
}

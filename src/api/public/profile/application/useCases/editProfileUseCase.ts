import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../../../bd/user/entities/user.schema';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';
import { AddProfileInputModel } from '../../dto/addProfile.dto';
import { UserQueryRepository } from '../../../../../bd/user/infrastructure/user-query.repository';

export class EditProfileCommand {
    constructor(public user: User, public inputModel: AddProfileInputModel) {}
}
@CommandHandler(EditProfileCommand)
export class EditProfileUseCase implements ICommandHandler<EditProfileCommand> {
    constructor(protected userQueryRepository: UserQueryRepository, protected userRepository: UserRepository) {}
    async execute(command: EditProfileCommand) {
        const addProfile = await this.userRepository.updateUserProfileInfo(command.inputModel, command.user.accountData.id);
    }
}

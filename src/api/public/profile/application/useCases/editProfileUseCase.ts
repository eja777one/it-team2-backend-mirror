import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../../../bd/user/entities/user.schema';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';
import { AddProfileInputModel } from '../../dto/addProfile.dto';
import { UserQueryRepository } from '../../../../../bd/user/infrastructure/user-query.repository';
import { BadRequestException } from '@nestjs/common';

export class EditProfileCommand {
    constructor(public user: User, public inputModel: AddProfileInputModel) {}
}
@CommandHandler(EditProfileCommand)
export class EditProfileUseCase implements ICommandHandler<EditProfileCommand> {
    constructor(protected userQueryRepository: UserQueryRepository, protected userRepository: UserRepository) {}
    async execute(command: EditProfileCommand) {
        if (command.user.profileInfo.userName === command.inputModel.userName) {
            const editProfile = await this.userRepository.updateUserProfileInfo(command.inputModel, command.user.accountData.id);
            return editProfile;
        }
        const checkUserFromBd = await this.userQueryRepository.checkUserNameFromBd(command.inputModel.userName);
        if (checkUserFromBd) {
            throw new BadRequestException([
                {
                    message: 'Incorrect UserName',
                    field: 'This userName already in db (User with this login is already registered)',
                },
            ]);
        }
        return await this.userRepository.updateUserProfileInfo(command.inputModel, command.user.accountData.id);
    }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';
import { UserQueryRepository } from '../../../../../bd/user/infrastructure/user-query.repository';
import { NotFoundException } from '@nestjs/common';

export class GetAvatarCommand {
    constructor(public userName: string) {}
}
@CommandHandler(GetAvatarCommand)
export class GetAvatarCommandUseCase implements ICommandHandler<GetAvatarCommand> {
    constructor(protected fileStorageAdapter: FileStorageAdapter, protected userQueryRepository: UserQueryRepository) {}
    async execute(command: GetAvatarCommand) {
        const user = await this.userQueryRepository.getUserByUserName(command.userName);
        const result = await this.fileStorageAdapter.getAvatar(user.accountData.id);
        if (!result) throw new NotFoundException();
        return result;
    }
}

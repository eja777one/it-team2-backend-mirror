import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';

export class DeleteAvatarCommand {
    constructor(public userId: string) {}
}
@CommandHandler(DeleteAvatarCommand)
export class DeleteAvatarCommandUseCase implements ICommandHandler<DeleteAvatarCommand> {
    constructor(protected fileStorageAdapter: FileStorageAdapter, protected userRepository: UserRepository) {}
    async execute(command: DeleteAvatarCommand) {
        const deleteAvatarFromDb = await this.userRepository.deleteAvatarFromDb(command.userId);
        const result = await this.fileStorageAdapter.deleteAvatar(command.userId);
    }
}

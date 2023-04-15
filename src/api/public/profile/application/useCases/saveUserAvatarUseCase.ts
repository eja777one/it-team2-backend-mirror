import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';
import { UserRepository } from '../../../../../bd/user/infrastructure/user.repository';

export class SaveUserAvatarCommand {
    constructor(public userId: string, public originalName: string, public buffer: Buffer) {}
}
@CommandHandler(SaveUserAvatarCommand)
export class SaveUserAvatarCommandUseCase implements ICommandHandler<SaveUserAvatarCommand> {
    constructor(protected fileStorageAdapter: FileStorageAdapter, protected userRepository: UserRepository) {}
    async execute(command: SaveUserAvatarCommand) {
        const saveAvatarFormDb = await this.userRepository.saveAvatarFromDb(command.userId);
        const result = await this.fileStorageAdapter.saveAvatar(command.userId, command.originalName, command.buffer);
    }
}

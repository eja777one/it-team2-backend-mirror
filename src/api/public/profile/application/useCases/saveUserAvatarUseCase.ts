import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';

export class SaveUserAvatarCommand {
    constructor(public userId: string, public originalName: string, public buffer: Buffer) {}
}
@CommandHandler(SaveUserAvatarCommand)
export class SaveUserAvatarCommandUseCase implements ICommandHandler<SaveUserAvatarCommand> {
    constructor(protected fileStorageAdapter: FileStorageAdapter) {}
    async execute(command: SaveUserAvatarCommand) {
        const result = await this.fileStorageAdapter.saveAvatar(command.userId, command.originalName, command.buffer);
    }
}

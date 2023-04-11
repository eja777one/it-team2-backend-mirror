import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';

export class DeleteAvatarCommand {
    constructor(public userId: string) {}
}
@CommandHandler(DeleteAvatarCommand)
export class DeleteAvatarCommandUseCase implements ICommandHandler<DeleteAvatarCommand> {
    constructor(protected fileStorageAdapter: FileStorageAdapter) {}
    async execute(command: DeleteAvatarCommand) {
        const result = await this.fileStorageAdapter.deleteAvatar(command.userId);
    }
}

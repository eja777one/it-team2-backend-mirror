import { User } from '../../../../../bd/user/entities/user.schema';
import { CreatePostInputModel } from '../../dto/createPost.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../infrastructure/post.repository';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';
import { PostQueryService } from '../post.query.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class DeletePostCommand {
    constructor(public userId: string, public postId: string) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostUseCase implements ICommandHandler<DeletePostCommand> {
    constructor(protected postRepository: PostRepository, protected postQueryRepository: PostQueryService, protected fileStorageAdapter: FileStorageAdapter) {}

    async execute(command: DeletePostCommand) {
        const findPostById = await this.postQueryRepository.getPostById(command.postId);
        console.log(findPostById);
        if (!findPostById) throw new NotFoundException();
        if (findPostById.userId != command.userId) {
            throw new UnauthorizedException();
        }

        for (let i = 0; i < findPostById.photo.length; i++) {
            await this.fileStorageAdapter.deletePostPhoto(command.userId, command.postId, i);
        }

        return await this.postRepository.deletePost(command.postId);
    }
}

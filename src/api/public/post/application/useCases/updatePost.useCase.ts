import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../../../bd/user/entities/user.schema';
import { CreatePostInputModel } from '../../dto/createPost.dto';
import { PostRepository } from '../../infrastructure/post.repository';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';
import { ForbiddenException, NotFoundException, UnauthorizedException } from '@nestjs/common';

export class UpdatePostCommand {
    constructor(public userId: string, public postId: string, public inputModel: CreatePostInputModel) {}
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostUseCase implements ICommandHandler<UpdatePostCommand> {
    constructor(protected postRepository: PostRepository) {}

    async execute(command: UpdatePostCommand) {
        const post = await this.postRepository.getPostById(command.postId);

        if (!post) throw new NotFoundException();
        if (post.userId !== command.userId) throw new UnauthorizedException();

        const updatedPost = await this.postRepository.updatePost(command.postId, command.inputModel.content);
    }
}

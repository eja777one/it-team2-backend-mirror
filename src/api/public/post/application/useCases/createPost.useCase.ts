import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../../../../bd/user/entities/user.schema';
import { CreatePostInputModel } from '../../dto/createPost.dto';
import { PostRepository } from '../../infrastructure/post.repository';
import { FileStorageAdapter } from '../../../../../common/adapter/fileStorageAdapterService';

export class CreatePostCommand {
    constructor(public user: User, public inputModel: CreatePostInputModel, public files: any) {}
}

@CommandHandler(CreatePostCommand)
export class CreatePostUseCase implements ICommandHandler<CreatePostCommand> {
    constructor(protected postRepository: PostRepository, protected fileStorageAdapter: FileStorageAdapter) {}

    async execute(command: CreatePostCommand) {
        const newPost = {
            id: new Date().valueOf().toString(),
            photo: [],
            userId: command.user.accountData.id,
            createdAt: new Date(),
            content: command.inputModel.content,
        };
        for (let i = 0; i < command.files.length; i++) {
            console.log('cicleStart');
            await this.fileStorageAdapter.savePostPhoto(command.user.accountData.id, command.files[i].originalName, command.files[i].buffer, i, newPost.id);
            const bucketParam = {
                Bucket: 'inctagram-backet',
                Key: `${command.user.accountData.id}/post/${newPost.id}/${i}post_.jpg`,
                Body: command.files[i].buffer,
                ContentType: 'images/jpg',
            };
            newPost.photo.push(`https://storage.yandexcloud.net/${bucketParam.Bucket}/inctagram-backet/${bucketParam.Key}`);
        }
        const postId = await this.postRepository.createPost(newPost);
        const post = await this.postRepository.getPostById(postId);
        return post;
    }
}

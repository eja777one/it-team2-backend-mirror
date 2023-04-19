import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostCommand } from '../application/useCases/createPost.useCase';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CreatePostInputModel } from '../dto/createPost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostQueryService } from '../application/post.query.service';
import { DeletePostCommand } from '../application/useCases/deletePost.useCase';

@Controller('post')
export class PostController {
    constructor(private commandBus: CommandBus, private postQueryService: PostQueryService) {}

    @UseGuards(BearerAuthGuard, ThrottlerGuard)
    @Post('createPost')
    @UseInterceptors(FilesInterceptor('files'))
    async createPost(@UploadedFiles() files: Array<Express.Multer.File>, @UserDecorator() user: User, @Body() inputModel: CreatePostInputModel) {
        return await this.commandBus.execute(new CreatePostCommand(user, inputModel, files));
    }

    @Get('allPosts')
    async getPost() {
        return await this.postQueryService.getAllPosts();
    }

    @Get(':id')
    async getPostById(@Param('id') id) {
        return await this.postQueryService.getPostById(id);
    }

    @UseGuards(BearerAuthGuard)
    @Delete(':id')
    async deletePost(@Param('id') id, @UserDecorator() user: User) {
        return await this.commandBus.execute(new DeletePostCommand(user.accountData.id, id));
    }
}

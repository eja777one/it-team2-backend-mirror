import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode, HttpStatus,
    Param,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {CreatePostCommand} from '../application/useCases/createPost.useCase';
import {BearerAuthGuard} from '../../../../common/guard/bearerAuth.guard';
import {UserDecorator} from '../../../../common/decorators/user.decorator';
import {User} from '../../../../bd/user/entities/user.schema';
import {ThrottlerGuard} from '@nestjs/throttler';
import {CreatePostInputModel} from '../dto/createPost.dto';
import {FilesInterceptor} from '@nestjs/platform-express';
import {PostQueryService} from '../application/post.query.service';
import {DeletePostCommand} from '../application/useCases/deletePost.useCase';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {sw_createPost, sw_deletePost, sw_getPostById, sw_getPosts} from "./post.swagger.info";

@ApiTags('Posts')
@Controller('post')
export class PostController {
    constructor(private commandBus: CommandBus, private postQueryService: PostQueryService) {
    }

    @ApiBearerAuth()
    @UseGuards(BearerAuthGuard, ThrottlerGuard)
    @Post('createPost')
    @ApiOperation(sw_createPost.summary)
    @ApiBody(sw_createPost.inputSchema)
    @ApiResponse(sw_createPost.status200)
    @ApiResponse(sw_createPost.status400)
    @ApiResponse(sw_createPost.status401)
    @ApiResponse(sw_createPost.status429)
    @UseInterceptors(FilesInterceptor('files'))
    async createPost(@UploadedFiles() files: Array<Express.Multer.File>,
                     @UserDecorator() user: User, @Body() inputModel: CreatePostInputModel) {
        return await this.commandBus.execute(new CreatePostCommand(user, inputModel, files));
    }

    @Get('allPosts')
    @ApiOperation(sw_getPosts.summary)
    @ApiResponse(sw_getPosts.status200)
    async getPosts() {
        return await this.postQueryService.getAllPosts();
    }

    @Get(':id')
    @ApiOperation(sw_getPostById.summary)
    @ApiResponse(sw_getPostById.status200)
    @ApiResponse(sw_getPostById.status404)
    async getPostById(@Param('id') id: string) {
        return await this.postQueryService.getPostById(id);
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(BearerAuthGuard)
    @Delete(':id')
    @ApiOperation(sw_deletePost.summary)
    @ApiResponse(sw_deletePost.status204)
    @ApiResponse(sw_deletePost.status401)
    @ApiResponse(sw_deletePost.status404)
    async deletePost(@Param('id') id, @UserDecorator() user: User) {
        return await this.commandBus.execute(new DeletePostCommand(user.accountData.id, id));
    }
}
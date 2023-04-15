import { Controller, Delete, Get, HttpCode, HttpStatus, Injectable, Param, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { SaveUserAvatarCommand } from '../application/useCases/saveUserAvatarUseCase';
import { DeleteAvatarCommand } from '../application/useCases/deleteAvatarUseCase';
import type { Response } from 'express';
import { GetAvatarCommand } from '../application/useCases/getAvatarUseCase';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {sw_deleteAvatar, sw_getFile, sw_uploadAvatar} from "./profile.swagger.info";

@ApiTags('Profile')
@Injectable()
@Controller('avatar')
export class AvatarController {
    constructor(private commandBus: CommandBus) {}

    @Get(':userName')
    @ApiOperation(sw_getFile.summary)
    @ApiResponse(sw_getFile.status200)
    @ApiResponse(sw_getFile.status404)
    async getFile(@Res({ passthrough: true }) res: Response, @Param('userName') userName) {
        const buffer = await this.commandBus.execute(new GetAvatarCommand(userName));
        for await (const chunk of buffer) {
            res.write(chunk);
        }
    }

    @ApiBearerAuth()
    @UseGuards(BearerAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation(sw_uploadAvatar.summary)
    @ApiResponse(sw_uploadAvatar.status204)
    @ApiResponse(sw_uploadAvatar.status401)
    async uploadAvatar(@UploadedFile() avatarFile: Express.Multer.File, @UserDecorator() user: User) {
        await this.commandBus.execute(new SaveUserAvatarCommand(user.accountData.id, avatarFile.originalname, avatarFile.buffer));
    }

    @ApiBearerAuth()
    @UseGuards(BearerAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('delete')
    @ApiOperation(sw_deleteAvatar.summary)
    @ApiResponse(sw_deleteAvatar.status204)
    @ApiResponse(sw_deleteAvatar.status401)
    async deleteAvatar(@UserDecorator() user: User) {
        await this.commandBus.execute(new DeleteAvatarCommand(user.accountData.id));
    }
}

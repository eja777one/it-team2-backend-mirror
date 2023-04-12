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

@Injectable()
@Controller('avatar')
export class AvatarController {
    constructor(private commandBus: CommandBus) {}

    @Get(':userName')
    async getFile(@Res({ passthrough: true }) res: Response, @Param('userName') userName) {
        const buffer = await this.commandBus.execute(new GetAvatarCommand(userName));
        for await (const chunk of buffer) {
            res.write(chunk);
        }
    }

    @Post('upload')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(BearerAuthGuard)
    async uploadAvatar(@UploadedFile() avatarFile: Express.Multer.File, @UserDecorator() user: User) {
        await this.commandBus.execute(new SaveUserAvatarCommand(user.accountData.id, avatarFile.originalname, avatarFile.buffer));
    }

    @Delete('delete')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(BearerAuthGuard)
    async deleteAvatar(@UserDecorator() user: User) {
        await this.commandBus.execute(new DeleteAvatarCommand(user.accountData.id));
    }
}

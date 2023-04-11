import { Controller, Delete, Get, HttpCode, HttpStatus, Injectable, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { SaveUserAvatarCommand } from '../application/useCases/saveUserAvatarUseCase';
import { DeleteAvatarCommand } from '../application/useCases/deleteAvatarUseCase';
import { GetAvatarCommand, GetAvatarCommandUseCase } from '../application/useCases/getAvatarUseCase';
import * as CircularJSON from 'circular-json';

@Injectable()
@Controller('avatar')
export class AvatarController {
    constructor(private commandBus: CommandBus) {}

    @Get(':userName')
    async getAvatar(@Param('userName') userName) {
        const result = await this.commandBus.execute(new GetAvatarCommand(userName));
        const j = await CircularJSON.stringify(result);
        return j;
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

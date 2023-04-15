import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { CommandBus } from '@nestjs/cqrs';
import { AddProfileCommand } from '../application/useCases/addProfileUseCase';
import { AddProfileInputModel } from '../dto/addProfile.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { sw_authMe, sw_regitstration } from '../../auth/api/auth.swagger.info';
import { sw_addProfile, sw_updateProfile } from './profile.swagger.info';
import { UpdateProfileInputModel } from '../dto/updateProfile.dto';
import { EditProfileCommand } from '../application/useCases/editProfileUseCase';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private commandBus: CommandBus) {}

    @ApiBearerAuth()
    @UseGuards(BearerAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('createProfile/:userName')
    @ApiOperation(sw_addProfile.summary)
    @ApiBody(sw_addProfile.inputSchema)
    @ApiResponse(sw_addProfile.status204)
    @ApiResponse(sw_addProfile.status400)
    @ApiResponse(sw_addProfile.status401)
    async addProfile(@UserDecorator() user: User, @Body() inputModel: AddProfileInputModel, @Param('userName') userName) {
        if (userName != user.profileInfo.userName) throw new UnauthorizedException();
        return await this.commandBus.execute(new AddProfileCommand(user, inputModel));
    }

    @ApiBearerAuth()
    @Put('edit/:userName')
    @UseGuards(BearerAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation(sw_updateProfile.summary)
    @ApiBody(sw_updateProfile.inputSchema)
    @ApiResponse(sw_updateProfile.status200)
    @ApiResponse(sw_updateProfile.status400)
    @ApiResponse(sw_updateProfile.status401)
    async updateProfile(@UserDecorator() user: User, @Body() inputModel: UpdateProfileInputModel, @Param('userName') userName) {
        if (userName != user.profileInfo.userName) throw new UnauthorizedException();
        return await this.commandBus.execute(new EditProfileCommand(user, inputModel));
    }
}

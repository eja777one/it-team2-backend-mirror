import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { CommandBus } from '@nestjs/cqrs';
import { EditProfileCommand } from '../application/useCases/editProfileUseCase';
import { AddProfileInputModel } from '../dto/addProfile.dto';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {sw_authMe, sw_regitstration} from "../../auth/api/auth.swagger.info";
import {sw_addProfile} from "./profile.swagger.info";

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
    constructor(private commandBus: CommandBus) {}

    @ApiBearerAuth()
    @UseGuards(BearerAuthGuard)
    @Put('edit')
    @ApiOperation(sw_addProfile.summary)
    @ApiBody(sw_addProfile.inputSchema)
    @ApiResponse(sw_addProfile.status200)
    @ApiResponse(sw_addProfile.status400)
    @ApiResponse(sw_addProfile.status400)
    async addProfile(@UserDecorator() user: User, @Body() inputModel: AddProfileInputModel) {
        return await this.commandBus.execute(new EditProfileCommand(user, inputModel));
    }
}

import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { CommandBus } from '@nestjs/cqrs';
import { EditProfileCommand } from '../application/useCases/editProfileUseCase';
import { AddProfileInputModel } from '../dto/addProfile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private commandBus: CommandBus) {}

    @Put('edit')
    @UseGuards(BearerAuthGuard)
    async addProfile(@UserDecorator() user: User, @Body() inputModel: AddProfileInputModel) {
        return await this.commandBus.execute(new EditProfileCommand(user, inputModel));
    }
}

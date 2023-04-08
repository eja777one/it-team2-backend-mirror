import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { CommandBus } from '@nestjs/cqrs';
import { QueryProfileService } from '../application/profile.service';

@Controller('queryProfile')
export class QueryProfileController {
    constructor(private commandBus: CommandBus, protected queryProfileService: QueryProfileService) {}

    @Get(':userName')
    @UseGuards(BearerAuthGuard)
    async getProfile(@UserDecorator() user: User, @Param('userName') userName) {
        console.log('tyt');
        return await this.queryProfileService.getProfile(userName);
    }
}

import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { BearerAuthGuard } from '../../../../common/guard/bearerAuth.guard';
import { UserDecorator } from '../../../../common/decorators/user.decorator';
import { User } from '../../../../bd/user/entities/user.schema';
import { CommandBus } from '@nestjs/cqrs';
import { QueryProfileService } from '../application/profile.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { sw_addProfile, sw_getProfile } from './profile.swagger.info';

@ApiTags('Profile')
@Controller('queryProfile')
export class QueryProfileController {
    constructor(private commandBus: CommandBus, protected queryProfileService: QueryProfileService) {}

    @Get(':userName')
    @ApiOperation(sw_getProfile.summary)
    @ApiResponse(sw_getProfile.status200)
    @ApiResponse(sw_getProfile.status404)
    async getProfile(@UserDecorator() user: User, @Param('userName') userName) {
        return await this.queryProfileService.getProfile(userName);
    }
}

import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserInputModelType } from '../../../super-admin/user/dto/user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { createUserCommand } from '../../../super-admin/user/application/useCases/createUser.UseCase';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmailInputModelType } from '../dto/emailResent.dto';
import { resentEmailCommand } from '../application/useCases/resentEmail.useCase';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {sw_registrationEmailResending, sw_regitstration} from "./auth.swagger.info";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private commandBus: CommandBus) {}

    @UseGuards(ThrottlerGuard)
    @HttpCode(204)
    @Post('registration')
    @ApiOperation(sw_regitstration.summary)
    @ApiResponse(sw_regitstration.status204)
    @ApiResponse(sw_regitstration.status400)
    @ApiBody(sw_regitstration.inputSchema)
    async registration(@Body() inputModel: CreateUserInputModelType) {
        return this.commandBus.execute(new createUserCommand(inputModel));
    }

    @UseGuards(ThrottlerGuard)
    @HttpCode(204)
    @Post('registration-email-resending')
    @ApiOperation(sw_registrationEmailResending.summary)
    @ApiResponse(sw_registrationEmailResending.status204)
    @ApiResponse(sw_registrationEmailResending.status400)
    @ApiBody(sw_registrationEmailResending.inputSchema)
    async registrationEmailResending(@Body() inputModel: EmailInputModelType) {
        return this.commandBus.execute(new resentEmailCommand(inputModel));
    }
}

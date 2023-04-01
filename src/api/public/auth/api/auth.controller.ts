import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUserInputModelType } from '../../../super-admin/user/dto/user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { createUserCommand } from '../../../super-admin/user/application/useCases/createUser.UseCase';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmailInputModelType } from '../dto/emailResent.dto';
import { resentEmailCommand } from '../application/useCases/resentEmail.useCase';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {sw_login, sw_registrationEmailResending, sw_regitstration} from './auth.swagger.info';
import { LocalAuthGuard } from '../../../../common/guard/local.auth.guard';
import { JwtAdapter } from '../../../../common/helpers/jwt/jwt.adapter';
import { CurrentUser } from '../../../../common/decorators/current.user.decorator';
import { CurrentUserId } from '../../../../common/types/currentUserId';
import { Response } from 'express';
import { createSessionCommand } from '../application/useCases/create.session.useCase';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private commandBus: CommandBus, private jwtAdapter: JwtAdapter) {}

    @UseGuards(ThrottlerGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration')
    @ApiOperation(sw_regitstration.summary)
    @ApiResponse(sw_regitstration.status204)
    @ApiResponse(sw_regitstration.status400)
    @ApiResponse(sw_regitstration.status429)
    @ApiBody(sw_regitstration.inputSchema)
    async registration(@Body() inputModel: CreateUserInputModelType) {
        return this.commandBus.execute(new createUserCommand(inputModel));
    }

    @UseGuards(ThrottlerGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Post('registration-email-resending')
    @ApiOperation(sw_registrationEmailResending.summary)
    @ApiResponse(sw_registrationEmailResending.status204)
    @ApiResponse(sw_registrationEmailResending.status400)
    @ApiResponse(sw_registrationEmailResending.status429)
    @ApiBody(sw_registrationEmailResending.inputSchema)
    async registrationEmailResending(@Body() inputModel: EmailInputModelType) {
        return this.commandBus.execute(new resentEmailCommand(inputModel));
    }

    @UseGuards(ThrottlerGuard)
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation(sw_login.summary)
    @ApiResponse(sw_login.status200)
    @ApiResponse(sw_login.status401)
    @ApiResponse(sw_login.status429)
    @ApiBody(sw_login.inputSchema)
    async login(@CurrentUser() userId: CurrentUserId, @Res({ passthrough: true }) response: Response) {
        const sessionId = await this.commandBus.execute(new createSessionCommand(userId));

        const { accessToken, refreshToken } = await this.jwtAdapter.getTokens(userId, sessionId);

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
        });

        return { accessToken: accessToken };
    }
}

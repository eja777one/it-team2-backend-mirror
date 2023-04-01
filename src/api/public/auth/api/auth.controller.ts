import { Body, Controller, HttpCode, HttpStatus, Ip, Post, Res, UseGuards, Headers } from '@nestjs/common';
import { CreateUserInputModelType } from '../../../super-admin/user/dto/user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../super-admin/user/application/useCases/createUser.UseCase';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmailInputModelType } from '../dto/emailResent.dto';
import { resentEmailCommand } from '../application/useCases/resentEmail.useCase';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { sw_login, sw_registrationEmailResending, sw_regitstration } from './auth.swagger.info';
import { LocalAuthGuard } from '../../../../common/guard/local.auth.guard';
import { JwtAdapter } from '../../../../common/helpers/jwt/jwt.adapter';
import { CurrentUser } from '../../../../common/decorators/current.user.decorator';
import { CurrentUserId } from '../../../../common/types/currentUserId';
import { Response } from 'express';
import { CreateSessionCommand } from '../application/useCases/createSessionUseCase';
import { PayloadFromRefreshToken } from '../../../../common/decorators/payload.token.decorator';
import { RefreshTokenPayloadType } from '../../../../common/types/jwt.types';
import { CookieGuard } from '../../../../common/guard/cookie.guard';
import { UpdateSessionCommand } from '../application/useCases/update.session.useCase';
import { RemoveSessionCommand } from '../application/useCases/remove.session.userCase';

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
        return this.commandBus.execute(new CreateUserCommand(inputModel));
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
    async login(
        @Ip() ip: string,
        @Headers('user-agent')
        deviceName: string,
        @CurrentUser() userId: CurrentUserId,
        @Res({ passthrough: true }) response: Response,
    ) {
        const sessionId = await this.commandBus.execute(new CreateSessionCommand(userId, ip, deviceName));

        const { accessToken, refreshToken } = await this.jwtAdapter.getTokens(userId, sessionId);

        response.cookie('refreshToken', refreshToken, {
            httpOnly: false,
            secure: false,
        });

        return { accessToken: accessToken };
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(CookieGuard)
    @Post('refresh-token')
    async refreshToken(@PayloadFromRefreshToken() payload: RefreshTokenPayloadType, @Res({ passthrough: true }) response: Response) {
        await this.commandBus.execute(new UpdateSessionCommand(payload.sessionId));

        const { accessToken, refreshToken } = await this.jwtAdapter.getTokens(payload.userId, payload.sessionId);

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
        });

        return { accessToken: accessToken };
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(CookieGuard)
    @Post('logout')
    async logout(@PayloadFromRefreshToken() payload: RefreshTokenPayloadType, @Res({ passthrough: true }) response: Response) {
        await this.commandBus.execute(new RemoveSessionCommand(payload.sessionId));
        response.clearCookie('refreshToken');
        return;
    }
}

import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateUserInputModelType } from '../../../super-admin/user/dto/user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { createUserCommand } from '../../../super-admin/user/application/useCases/createUser.UseCase';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmailInputModelType } from '../dto/emailResent.dto';
import { resentEmailCommand } from '../application/useCases/resentEmail.useCase';

@Controller('auth')
export class AuthController {
    constructor(private commandBus: CommandBus) {}

    @UseGuards(ThrottlerGuard)
    @HttpCode(204)
    @Post('registration')
    async registration(@Body() inputModel: CreateUserInputModelType) {
        return this.commandBus.execute(new createUserCommand(inputModel));
    }

    @UseGuards(ThrottlerGuard)
    @Post('registration-email-resending')
    @HttpCode(204)
    async registrationEmailResending(@Body() inputModel: EmailInputModelType) {
        return this.commandBus.execute(new resentEmailCommand(inputModel));
    }
}

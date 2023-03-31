import { Body, Controller, Get } from '@nestjs/common';
import { CreateUserInputModelType } from '../../../super-admin/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor() {}
    @Get('registration')
    async registration(@Body() inputModel: CreateUserInputModelType) {}
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getMailConfig } from './common/helpers/email/mail.config';
import { User, UserSchema } from './bd/user/entities/user.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsEmailInInDBValidator, IsLoginInDBValidator } from './common/validators/register.validators';
import { createUserUseCase } from './api/super-admin/user/application/useCases/createUser.UseCase';
import { UserRepository } from './bd/user/infrastructure/user.repository';
import { EmailService } from './common/helpers/email/email.service';
import { AuthController } from './api/public/auth/api/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ResendEmailValidator } from './common/validators/resendEmailValidator';
import { resentEmailUseCase } from './api/public/auth/application/useCases/resentEmail.useCase';

const controller = [AppController, AuthController];
const service = [AppService, EmailService];
const repository = [UserRepository];
const validators = [IsLoginInDBValidator, IsEmailInInDBValidator, ResendEmailValidator];
const useCases = [createUserUseCase, resentEmailUseCase];

@Module({
    imports: [
        CqrsModule,
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
        ThrottlerModule.forRoot({
            ttl: 10,
            limit: 5,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [...controller],
    providers: [...repository, ...service, ...validators, ...useCases],
})
export class AppModule {}

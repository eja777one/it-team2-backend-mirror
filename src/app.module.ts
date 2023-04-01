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
import { AuthService } from './api/public/auth/application/auth.service';
import { LocalStrategy } from './common/strategy/local.strategy';
import { JwtAdapter } from './common/helpers/jwt/jwt.adapter';
import { CreateSessionUseCase } from './api/public/auth/application/useCases/createSessionUseCase';
import { Session, SessionSchema } from './bd/user/entities/session.schema';
import { SessionRepository } from './bd/user/infrastructure/session.repository';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UpdateSessionUseCase } from './api/public/auth/application/useCases/update.session.useCase';

const controller = [AppController, AuthController];
const service = [AppService, EmailService, AuthService, JwtAdapter, JwtService];
const repository = [UserRepository, SessionRepository];
const validators = [IsLoginInDBValidator, IsEmailInInDBValidator, ResendEmailValidator];
const useCases = [createUserUseCase, resentEmailUseCase, CreateSessionUseCase, UpdateSessionUseCase];
const strategy = [LocalStrategy];

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'swagger-static'),
            serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
        }),
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
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Session.name, schema: SessionSchema },
        ]),
    ],
    controllers: [...controller],
    providers: [...repository, ...service, ...validators, ...useCases, ...strategy],
})
export class AppModule {}

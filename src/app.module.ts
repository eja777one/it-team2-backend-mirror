import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailConfig } from './common/helpers/email/mail.config';
import { User, UserSchema } from './bd/user/entities/user.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsEmailInInDBValidator } from './common/validators/register.validators';
import { createUserUseCase } from './api/super-admin/user/application/useCases/createUser.UseCase';
import { UserRepository } from './bd/user/infrastructure/user.repository';
import { EmailService } from './common/helpers/email/email.service';
import { AuthController } from './api/public/auth/api/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ResendEmailValidator } from './common/validators/resendEmail.validator';
import { ResentEmailUseCase } from './api/public/auth/application/useCases/resentEmailUseCase';
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
import { RemoveSessionUseCase } from './api/public/auth/application/useCases/remove.session.userCase';
import { NewPasswordUseCase } from './api/public/auth/application/useCases/newPassword.useCase';
import { RegistrationConfirmUseCase } from './api/public/auth/application/useCases/registrationConfirm.useCase';
import { PasswordRecoveryValidators } from './common/validators/passwordRecovery.validators';
import { PasswordRecoveryCodeUseCase } from './api/public/auth/application/useCases/passwordRecovery.useCase';
import { TestsController } from './test/test.controller';
import { ProfileController } from './api/public/profile/api/profile.controller';
import { AddProfileValidator } from './common/validators/addProfile.validator';
import { AddProfileUseCase } from './api/public/profile/application/useCases/addProfileUseCase';
import { UserQueryRepository } from './bd/user/infrastructure/user-query.repository';
import { QueryProfileController } from './api/public/profile/api/queryProfile.controller';
import { QueryProfileService } from './api/public/profile/application/profile.service';
import { ProfileRepository } from './api/public/profile/infrastructure/profile.repository';
import { AvatarController } from './api/public/profile/api/avatar.controller';
import { SaveUserAvatarCommandUseCase } from './api/public/profile/application/useCases/saveUserAvatarUseCase';
import { FileStorageAdapter } from './common/adapter/fileStorageAdapterService';
import { DeleteAvatarCommandUseCase } from './api/public/profile/application/useCases/deleteAvatarUseCase';
import { GetAvatarCommandUseCase } from './api/public/profile/application/useCases/getAvatarUseCase';
import { EditProfileUseCase } from './api/public/profile/application/useCases/editProfileUseCase';
import { Post, PostSchema } from './api/public/post/application/entities/post.schema';
import { PostRepository } from './api/public/post/infrastructure/post.repository';
import { PostController } from './api/public/post/api/post.controller ';
import { CreatePostUseCase } from './api/public/post/application/useCases/createPost.useCase';
import { PostQueryService } from './api/public/post/application/post.query.service';
import { DeletePostUseCase } from './api/public/post/application/useCases/deletePost.useCase';
import { UpdatePostUseCase } from './api/public/post/application/useCases/updatePost.useCase';

const controller = [AppController, AuthController, ProfileController, QueryProfileController, TestsController, AvatarController, PostController];
const service = [AppService, EmailService, AuthService, QueryProfileService, JwtAdapter, JwtService, FileStorageAdapter, PostQueryService];
const repository = [UserRepository, SessionRepository, UserQueryRepository, ProfileRepository, PostRepository];
const validators = [AddProfileValidator, IsEmailInInDBValidator, ResendEmailValidator, PasswordRecoveryValidators, PasswordRecoveryValidators];
const useCases = [
    createUserUseCase,
    ResentEmailUseCase,
    CreateSessionUseCase,
    UpdateSessionUseCase,
    RemoveSessionUseCase,
    ResentEmailUseCase,
    NewPasswordUseCase,
    RegistrationConfirmUseCase,
    ResentEmailUseCase,
    PasswordRecoveryCodeUseCase,
    AddProfileUseCase,
    SaveUserAvatarCommandUseCase,
    DeleteAvatarCommandUseCase,
    EditProfileUseCase,
    GetAvatarCommandUseCase,
    DeletePostUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
];
const strategy = [LocalStrategy];

@Module({
    imports: [
        HttpModule,
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
            { name: Post.name, schema: PostSchema },
        ]),
    ],
    controllers: [...controller],
    providers: [...repository, ...service, ...validators, ...useCases, ...strategy],
})
export class AppModule {}

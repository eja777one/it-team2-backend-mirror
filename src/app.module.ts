import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './bd/user/entities/user.schema';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 10,
            limit: 5,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

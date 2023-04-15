import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, Length } from 'class-validator';

export type UserDocument = User & Document;

class AccountData {
    @Prop()
    id: string;
    @Prop({ type: String })
    login: string;
    @Prop({ type: String })
    password: string;
    @Prop({ type: String })
    email: string;
    @Prop()
    createdAt: string;
}
class EmailConfirmation {
    @Prop()
    confirmationCode: string;
    @Prop()
    expirationData: Date;
    @Prop()
    @IsDate()
    recoveryCode: string;
    @Prop()
    isConfirmed: boolean;
}
class ProfileInfo {
    @Prop()
    userName: string;
    @Prop()
    name: string;
    @Prop()
    surname: string;
    @Prop()
    birthday: string;
    @Prop()
    city: string;
    @Prop()
    aboutMe: string;
    @Prop()
    linkAvatar: string;
}

@Schema()
export class User {
    @Prop()
    accountData: AccountData;
    @Prop()
    emailConfirmation: EmailConfirmation;
    @Prop()
    profileInfo: ProfileInfo;

    isConfirmed: () => boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.isConfirmed = function (): boolean {
    return this.emailConfirmation.isConfirmed === true;
};

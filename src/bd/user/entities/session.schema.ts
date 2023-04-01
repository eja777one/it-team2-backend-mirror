import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { add } from 'date-fns';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
    @Prop()
    id: string;
    @Prop()
    userId: string;
    @Prop()
    issueAt: string;
    @Prop()
    expireAt: string;

    updateDate: () => boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);

SessionSchema.methods.updateDate = function (): boolean {
    const date = new Date();

    this.issueAt = date.toISOString();
    this.expireAt = add(date, { minutes: +process.env.EXPIRE_REFRESH_JWT }).toISOString();

    return true;
};

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SessionDocument = Session & Document;

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
}

export const SessionSchema = SchemaFactory.createForClass(Session);

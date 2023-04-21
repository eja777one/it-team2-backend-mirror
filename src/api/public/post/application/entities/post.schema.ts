import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, Length } from 'class-validator';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop()
    id: string;
    @Prop()
    content: string;
    @Prop()
    userId: string;
    @Prop()
    createdAt: Date;
    @Prop()
    photo: [];
}

export const PostSchema = SchemaFactory.createForClass(Post);

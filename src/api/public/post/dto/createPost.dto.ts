import { Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
class Photo {
    @Prop()
    name: string;
}
export class CreatePostInputModel {
    @Length(4, 30)
    content: string;
}

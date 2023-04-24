import { Length } from 'class-validator';
import { Prop } from '@nestjs/mongoose';
class Photo {
    @Prop()
    name: string;
}
export class CreatePostInputModel {
    @Length(0, 500)
    content: string;
}

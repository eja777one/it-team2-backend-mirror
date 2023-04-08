import { IsEnum, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { CheckUserNameFromDB } from '../../../../common/decorators/addProfile.decorator';
import { Transform } from 'class-transformer';

export class AddProfileInputModel {
    @CheckUserNameFromDB()
    @Length(4, 30)
    userName: string;

    @Length(4, 20)
    name: string;

    @Length(4, 20)
    surname: string;

    @Length(0, 20)
    birthday: string;

    @Length(0, 20)
    city: string;

    @Length(0, 200)
    aboutMe: string;
}

import { Length } from 'class-validator';
import { CheckUserNameFromDB } from '../../../../common/decorators/addProfile.decorator';

export class UpdateProfileInputModel {
    @Length(4, 30)
    userName: string;

    @Length(3, 20)
    name: string;

    @Length(3, 20)
    surname: string;

    @Length(0, 30)
    birthday: string;

    @Length(0, 20)
    city: string;

    @Length(0, 200)
    aboutMe: string;
}

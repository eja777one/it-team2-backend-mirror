import { Length, NotContains } from 'class-validator';
import { CheckUserNameFromDB } from '../../../../common/decorators/addProfile.decorator';
import { Transform } from 'class-transformer';

export class UpdateProfileInputModel {
    @Length(4, 30)
    @NotContains(' ')
    userName: string;

    @Length(3, 20)
    @NotContains(' ')
    name: string;

    @Length(3, 20)
    @NotContains(' ')
    surname: string;

    @Length(0, 30)
    birthday: string;

    @NotContains(' ')
    @Length(0, 20)
    city: string;

    @Length(0, 200)
    aboutMe: string;
}

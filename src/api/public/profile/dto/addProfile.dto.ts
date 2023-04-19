import { Length, NotContains } from 'class-validator';
import { CheckUserNameFromDB } from '../../../../common/decorators/addProfile.decorator';
import { Transform, TransformFnParams } from 'class-transformer';

export class AddProfileInputModel {
    @CheckUserNameFromDB()
    @NotContains(' ')
    @Length(4, 30)
    userName: string;

    @NotContains(' ')
    @Length(3, 20)
    name: string;

    @NotContains(' ')
    @Length(3, 20)
    surname: string;

    @Length(0, 30)
    birthday: string;

    @NotContains(' ')
    @Length(0, 20)
    city: string;

    @Length(0, 200)
    aboutMe: string;
}

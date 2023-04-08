import { IsEmail, IsString, Length } from 'class-validator';
import { IsEmailInDb } from '../../../../common/decorators/register.decorators';
import { ApiProperty } from '@nestjs/swagger';
import { CheckUserNameFromDB } from '../../../../common/decorators/addProfile.decorator';

export class CreateUserInputModelType {
    @CheckUserNameFromDB()
    @Length(4, 30)
    userName: string;

    @ApiProperty()
    @Length(6, 20)
    @IsString()
    password: string;

    @ApiProperty()
    @IsEmailInDb()
    @IsEmail({}, { message: 'Incorrect Email' })
    @Length(1, 40)
    email: string;
}

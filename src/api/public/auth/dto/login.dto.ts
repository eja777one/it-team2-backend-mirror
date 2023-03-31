import { IsEmail, Length } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Incorrect Email' })
    @Length(1, 40)
    email: string;

    @Length(6, 20)
    password: string;
}

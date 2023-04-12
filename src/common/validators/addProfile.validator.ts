import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../bd/user/entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
@ValidatorConstraint({ async: true })
export class AddProfileValidator implements ValidatorConstraintInterface {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    async validate(userName: string) {
        try {
            const user = await this.userModel.findOne({
                'profileInfo.userName': userName,
            });
            if (user) return false;
            return true;
        } catch (e) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return 'This userName already in db (User with this login is already registered)';
    }
}

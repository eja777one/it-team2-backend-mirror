import { registerDecorator, ValidationOptions } from 'class-validator';
import { AddProfileValidator } from '../validators/addProfile.validator';

export function CheckUserNameFromDB(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: AddProfileValidator,
        });
    };
}

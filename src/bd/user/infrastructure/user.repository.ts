import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../entities/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async getUserByEmail(email: string): Promise<UserDocument | null> {
        try {
            return this.userModel.findOne({'accountData.email': email});
        } catch (e) {
            return null;
        }
    }

    async getUserByConfirmationCode(code: string) {
        return this.userModel.findOne({'emailConfirmation.confirmationCode': code}, {_id: 0, __v: 0, password: 0});
    }

    async createUser(newUser): Promise<User | null> {
        try {
            return this.userModel.create(newUser);
        } catch (e) {
            return null;
        }
    }

    async updatePasswordRecoveryCode(recoveryCode: string, newHashPassword: string) {
        const result = await this.userModel.updateOne({'emailConfirmation.recoveryCode': recoveryCode}, {$set: {'accountData.password': newHashPassword}});
        return result.matchedCount === 1;
    }

    async updateUserRecoveryPasswordCodeByEmail(email: string, NewRecoveryCode: string) {
        const result = await this.userModel.updateOne({'accountData.email': email}, {$set: {'emailConfirmation.recoveryCode': NewRecoveryCode}});
        return result.matchedCount === 1;
    }

    async updateUserCheckConfirmCode(code: string) {
        const result = await this.userModel.updateOne({'emailConfirmation.confirmationCode': code}, {$set: {'emailConfirmation.isConfirmed': true}});
        return result.matchedCount === 1;
    }

    async updateUserConfirmationCodeByEmail(email: string, newConfirmationCode: string) {
        const result = await this.userModel.updateOne({'accountData.email': email}, {$set: {'emailConfirmation.confirmationCode': newConfirmationCode}});
        return result.matchedCount === 1;
    }

    // methods for testing

    async deleteAll() {
        const result = await this.userModel.deleteMany({});
        return result.deletedCount;
    }

    async activateUser(email) {
        const result = await this.userModel.updateOne(
            {'accountData.email': email},
            {$set: {'emailConfirmation.isConfirmed': true}}
        );
        return result.matchedCount === 1;
    }

    async getDBUsers() {
        const result = await this.userModel.find({});
        return result;
    }
}

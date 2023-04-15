import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../../bd/user/entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getProfile(userName: string) {
        const result = await this.userModel.findOne({ 'profileInfo.userName': userName }, { profileInfo: 1 });
        if (!result) throw new NotFoundException();
        return result;
    }
}

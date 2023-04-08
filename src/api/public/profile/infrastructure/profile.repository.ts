import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../../../bd/user/entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getProfile(username: string) {
        return this.userModel.findOne({ 'profileInfo.userName': username }, { profileInfo: 1 });
    }
}

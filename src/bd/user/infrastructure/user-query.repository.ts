import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserQueryRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {}

    async getUserById(id: string) {
        return this.userModel.findOne({ 'accountData.id': id }, { 'accountData.password': 0 });
    }
    async getUserByUserName(userName: string) {
        const result = await this.userModel.findOne({ 'profileInfo.userName': userName }, { 'accountData.password': 0 });
        if (!result) throw new NotFoundException();
        return result;
    }
    async checkUserNameFromBd(userName: string) {
        const result = await this.userModel.findOne({ 'profileInfo.userName': userName }, { 'accountData.password': 0 });
        if (!result) return false;
        return result;
    }
}

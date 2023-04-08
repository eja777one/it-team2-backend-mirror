import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';

@Injectable()
export class UserQueryRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private jwtService: JwtService) {}

    async getUserById(id: string) {
        return this.userModel.findOne({ id: id });
    }
}

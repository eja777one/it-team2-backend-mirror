import { Injectable } from '@nestjs/common';
import { ProfileRepository } from '../infrastructure/profile.repository';

@Injectable()
export class QueryProfileService {
    constructor(protected profileRepository: ProfileRepository) {}

    async getProfile(userName: string) {
        return this.profileRepository.getProfile(userName);
    }
}

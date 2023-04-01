import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionDocument } from '../entities/session.schema';

@Injectable()
export class SessionRepository {
    constructor(@InjectModel(Session.name) private sessionModel: Model<SessionDocument>) {}

    async createSession(newSession): Promise<SessionDocument | null> {
        try {
            return this.sessionModel.create(newSession);
        } catch (e) {
            return null;
        }
    }
}
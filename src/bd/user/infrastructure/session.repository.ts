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
    async getBySessionId(sessionId: string): Promise<SessionDocument | null> {
        try {
            return this.sessionModel.findOne({ id: sessionId });
        } catch (e) {
            return null;
        }
    }
    async save(session: SessionDocument): Promise<SessionDocument> {
        return session.save();
    }
    async delete(sessionId: string): Promise<boolean> {
        try {
            await this.sessionModel.findOneAndDelete({ id: sessionId });
            return true;
        } catch (e) {
            return false;
        }
    }
}

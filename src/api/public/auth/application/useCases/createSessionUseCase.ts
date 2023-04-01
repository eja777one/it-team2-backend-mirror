import { CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { add } from 'date-fns';
import { SessionRepository } from '../../../../../bd/user/infrastructure/session.repository';

export class CreateSessionCommand {
    constructor(public userId: string) {}
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionUseCase {
    constructor(private jwtService: JwtService, private sessionsRepository: SessionRepository) {}

    async execute(command: CreateSessionCommand): Promise<string> {
        const date = new Date();

        const newSession = {
            id: date.valueOf().toString(),
            userId: command.userId,
            issueAt: date.toISOString(),
            expireAt: add(date, { hours: +process.env.EXPIRE_REFRESH_JWT }),
        };

        const session = await this.sessionsRepository.createSession(newSession);

        return session.id;
    }
}

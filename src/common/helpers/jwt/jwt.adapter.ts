import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './jwt.types';

@Injectable()
export class JwtAdapter {
    constructor(private jwtService: JwtService) {}

    getTokens(userId: string, sessionId: string): Tokens {
        const accessToken = this.createJWT(userId);
        const refreshToken = this.createRefreshJWT(userId, sessionId);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
    }
    private createJWT(userId: string): string {
        return this.jwtService.sign(
            { userId: userId },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: process.env.EXPIRE_ACCESS_JWT,
            },
        );
    }
    private createRefreshJWT(userId: string, sessionId: string): string {
        return this.jwtService.sign(
            { userId: userId, sessionId: sessionId },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.EXPIRE_REFRESH_JWT,
            },
        );
    }
}

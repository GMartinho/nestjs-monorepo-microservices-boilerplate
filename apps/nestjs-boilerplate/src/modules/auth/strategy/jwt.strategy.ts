import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Environment } from '@libs/core/env/environment';
import { Id } from '@libs/database/database.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, public env: Environment) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.jwtSecret,
        });
    }

    async validate(payload: { userId: Id }) {
        const user = await this.authService.validateUser(payload.userId);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
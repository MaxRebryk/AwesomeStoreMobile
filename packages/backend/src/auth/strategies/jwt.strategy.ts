import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

interface IJwtPayload {
	uid: string;
	email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private prisma: PrismaService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET || 'super-secret',
		});
	}

	async validate(payload: IJwtPayload) {
		const user = await this.prisma.user.findUnique({
			where: { uid: payload.uid },
		});
		return { uid: payload.uid, email: payload.email, role: user?.role };
	}
}

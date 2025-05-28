import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtAuthGuard } from './/guards/jwt.guard';
import { EmailModule } from '@/email/email.module';
import { UsersModule } from '@/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		PrismaModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		EmailModule,
		UsersModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'super-secret',
			signOptions: { expiresIn: '24h' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtAuthGuard, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}

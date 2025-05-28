import {
	Controller,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { Public } from '@/decorators/public.decorator';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly emailService: EmailService,
	) {}

	@Public()
	@Post('register')
	register(@Body() dto: RegisterUserDto) {
		return this.authService.register(dto);
	}

	@Public()
	@Post('login')
	login(@Body() dto: LoginUserDto) {
		return this.authService.login(dto);
	}

	@Public()
	@Post('verify-email')
	verifyEmail(@Body() dto: { email: string; code: string }) {
		return this.emailService.verifyCode(dto.email, dto.code);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.ADMIN)
	@Delete(':uid')
	remove(@Param('uid') uid: string) {
		return this.authService.remove(uid);
	}
}

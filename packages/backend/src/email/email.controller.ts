import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from '@/decorators/public.decorator';

@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}
	@Public()
	@Post('send-code')
	sendCode(@Body('email') email: string) {
		return this.emailService.sendVerificationCode(email);
	}

	@Public()
	@Post('verify-code')
	verifyCode(@Body() dto: { email: string; code: string }) {
		return this.emailService.verifyCode(dto.email, dto.code);
	}
}

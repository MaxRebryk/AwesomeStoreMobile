import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
	constructor(private prisma: PrismaService) {
		const apiKey = process.env.SENDGRID_API_KEY;
		if (!apiKey) throw new Error('SENDGRID_API_KEY is not defined');

		sgMail.setApiKey(apiKey);
	}

	private generateVerificationCode(): string {
		return Math.floor(1000 + Math.random() * 9000).toString();
	}

	async sendVerificationEmail(email: string, code: string) {
		const message = {
			to: email,
			from: process.env.SENDGRID_FROM || 'maxrebryk0@gmail.com',
			subject: 'Email Verification',
			text: `Your verification code is: ${code}`,
			html: `<strong>Your verification code is: ${code}</strong>`,
		};

		await sgMail.send(message);
	}

	async sendVerificationCode(email: string): Promise<string> {
		const user = await this.prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new NotFoundException('User not found');
		}

		const verificationCode = this.generateVerificationCode();

		await this.prisma.user.update({
			where: { email },
			data: {
				verificationCode,
				verificationCodeExpiry: new Date(Date.now() + 15 * 60 * 1000),
			},
		});

		await this.sendVerificationEmail(email, verificationCode);

		return 'Verification code sent to email';
	}

	async verifyCode(email: string, code: string): Promise<string> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (user.verificationCode !== code) {
			throw new BadRequestException('Invalid verification code');
		}

		if (
			!user.verificationCodeExpiry ||
			new Date() > new Date(user.verificationCodeExpiry)
		) {
			throw new BadRequestException('Verification code has expired');
		}

		await this.prisma.user.update({
			where: { email },
			data: {
				emailVerified: true,
				verificationCode: null,
				verificationCodeExpiry: null,
			},
		});

		return 'Email successfully verified';
	}
}

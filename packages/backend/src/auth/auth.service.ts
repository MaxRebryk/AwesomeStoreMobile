import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
	BadRequestException,
	Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
		private usersService: UsersService,
		private emailService: EmailService,
	) {}

	async register(dto: RegisterUserDto) {
		const email = dto.email;
		const existingUser = await this.usersService.findUserByEmail(email);
		if (existingUser) {
			throw new BadRequestException('Email is already in use');
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				name: dto.name,
				password: hashedPassword,
				phoneNumber: dto.phoneNumber,
				shippingAddress: dto.shippingAddress,
				emailVerified: false,
			},
		});

		await this.emailService.sendVerificationCode(dto.email);

		const { ...result } = user;

		return {
			...result,
			message: 'Verification code sent to email',
		};
	}

	async login(dto: LoginUserDto) {
		this.logger.debug(`Attempting login for email: ${dto.email}`);

		const email = dto.email;
		const user = await this.usersService.findUserByEmail(email);

		if (!user) {
			this.logger.debug(`User not found for email: ${email}`);
			throw new NotFoundException('User not found');
		}

		this.logger.debug(`User found: ${user.uid}`);

		const isPasswordValid = await bcrypt.compare(
			dto.password,
			user.password,
		);

		if (!isPasswordValid) {
			this.logger.debug(`Invalid password for user: ${user.uid}`);
			throw new UnauthorizedException('Invalid password');
		}

		this.logger.debug(`Password valid for user: ${user.uid}`);

		if (!user.emailVerified) {
			this.logger.debug(`Email not verified for user: ${user.uid}`);
			throw new UnauthorizedException('Email is not verified');
		}

		this.logger.debug(`Email verified for user: ${user.uid}`);

		const { ...result } = user;
		const token = this.jwtService.sign({
			uid: user.uid,
			email: user.email,
		});

		this.logger.debug(`Generated token for user: ${user.uid}`);

		return {
			...result,
			token,
		};
	}

	async remove(uid: string) {
		try {
			return await this.prisma.user.delete({
				where: { uid },
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}
}

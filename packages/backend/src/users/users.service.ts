import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateUserDto) {
		return this.prisma.user.create({
			data: dto,
		});
	}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(uid: string) {
		const user = await this.prisma.user.findUnique({
			where: { uid },
		});
		if (!user) throw new NotFoundException('User not found');
		return user;
	}

	async findUserByEmail(email: string) {
		const user = await this.prisma.user.findUnique({ where: { email } });
		if (!user) return;
		return user;
	}

	async update(uid: string, dto: UpdateUserDto) {
		try {
			return await this.prisma.user.update({
				where: { uid },
				data: dto,
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}

	async updatePassword(uid: string, dto: UpdatePasswordDto) {
		const user = await this.findOne(uid);

		const isPasswordValid = await bcrypt.compare(
			dto.currentPassword,
			user.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid current password');
		}

		const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

		return this.prisma.user.update({
			where: { uid },
			data: {
				password: hashedPassword,
			},
		});
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

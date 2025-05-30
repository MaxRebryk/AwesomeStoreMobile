import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(3)
	name: string;

	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	@MinLength(6)
	phoneNumber: string;

	@IsString()
	@MinLength(3)
	shippingAddress: string;
}

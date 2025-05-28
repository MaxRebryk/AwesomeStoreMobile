import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductsDto {
	@IsString()
	name: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsString()
	category: string;

	@IsNumber()
	inStock: number;

	@IsNumber()
	price: number;
}

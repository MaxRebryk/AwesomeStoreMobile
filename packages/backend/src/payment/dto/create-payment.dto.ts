import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class CreatePaymentDto {
	@IsUUID()
	@IsNotEmpty()
	orderId: string;

	@IsNumber()
	@IsNotEmpty()
	totalAmount: number;

	@IsString()
	@IsOptional()
	transactionId?: string;
}

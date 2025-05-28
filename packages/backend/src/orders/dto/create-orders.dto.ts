import { IsUUID, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PaymentStatus, DeliveryStatus } from '@prisma/client';

export class CreateOrdersDto {
	@IsUUID()
	userId: string;

	@IsNumber()
	totalAmount: number;

	@IsOptional()
	@IsEnum(PaymentStatus)
	paymentStatus?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus)
	deliveryStatus?: DeliveryStatus;
}

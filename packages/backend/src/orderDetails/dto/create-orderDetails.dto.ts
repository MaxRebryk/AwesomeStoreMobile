import { IsUUID, IsInt, IsPositive, IsNumber } from 'class-validator';

export class CreateOrderDetailsDto {
	@IsUUID()
	orderId: string;

	@IsUUID()
	productId: string;

	@IsInt()
	@IsPositive()
	quantity: number;

	@IsNumber({ maxDecimalPlaces: 2 })
	@IsPositive()
	priceAtPurchase: number;
}

export class CreateOrderDetailsBodyDto {
	@IsUUID()
	productId: string;

	@IsInt()
	@IsPositive()
	quantity: number;
}

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
	Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';

type FilterPaymentStatus = PaymentStatus | 'ALL';
type FilterDeliveryStatus = DeliveryStatus | 'ALL';

@Controller('order')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(
		@Query('sortDate') sortDate?: 'asc' | 'desc',
		@Query('deliveryStatus') deliveryStatus?: FilterDeliveryStatus,
		@Query('paymentStatus') paymentStatus?: FilterPaymentStatus,
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		return this.ordersService.findAll(
			sortDate,
			deliveryStatus,
			paymentStatus,
			page,
			limit,
		);
	}
	@UseGuards(JwtAuthGuard)
	@Get(':uid')
	findOne(@Param('uid') uid: string) {
		return this.ordersService.findOne(uid);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() dto: CreateOrdersDto) {
		return this.ordersService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Post('update/:uid')
	update(@Param('uid') uid: string, @Body() dto: UpdateOrdersDto) {
		return this.ordersService.update(uid, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':uid')
	delete(@Param('uid') uid: string) {
		return this.ordersService.delete(uid);
	}
}

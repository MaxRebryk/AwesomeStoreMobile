import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
	Query,
	Request,
	Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt.guard';
import { OrderDetailsService } from './orderDetails.service';
import { CreateOrderDetailsBodyDto } from './dto/create-orderDetails.dto';
import { UpdateOrderDetailsDto } from './dto/update-orderDetails.dto';
import { OrderAccessGuard } from '../orders/guards/order-access.guard';
import { Role } from '@prisma/client';
import { Request as ExpressRequest } from 'express';

interface RequestWithUser extends ExpressRequest {
	user: {
		uid: string;
		role: Role;
	};
}

@Controller('order-details')
export class OrderDetailsController {
	private readonly logger = new Logger(OrderDetailsController.name);

	constructor(private readonly ordersService: OrderDetailsService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(
		@Request() req: RequestWithUser,
		@Query('page') page?: number,
		@Query('limit') limit?: number,
	) {
		const userId = req.user.role === Role.ADMIN ? undefined : req.user.uid;
		return this.ordersService.findAll(page, limit, userId);
	}

	@UseGuards(JwtAuthGuard, OrderAccessGuard)
	@Get(':orderDetailId')
	findOne(@Param('orderDetailId') orderDetailId: string) {
		return this.ordersService.findOne(orderDetailId);
	}

	@UseGuards(JwtAuthGuard, OrderAccessGuard)
	@Post(':orderId')
	create(
		@Param('orderId') orderId: string,
		@Body() dto: CreateOrderDetailsBodyDto,
	) {
		this.logger.debug(`Received DTO: ${JSON.stringify(dto)}`);
		return this.ordersService.create({ ...dto, orderId });
	}

	@UseGuards(JwtAuthGuard, OrderAccessGuard)
	@Post('update/:orderDetailId')
	update(
		@Param('orderDetailId') orderDetailId: string,
		@Body() dto: UpdateOrderDetailsDto,
	) {
		return this.ordersService.update(orderDetailId, dto);
	}

	@UseGuards(JwtAuthGuard, OrderAccessGuard)
	@Delete(':orderDetailId')
	delete(@Param('orderDetailId') orderDetailId: string) {
		return this.ordersService.delete(orderDetailId);
	}

	@UseGuards(JwtAuthGuard, OrderAccessGuard)
	@Delete('remove-product/:orderDetailId')
	async removeProductFromOrder(
		@Param('orderDetailId') orderDetailId: string,
	) {
		return this.ordersService.removeProductFromOrder(orderDetailId);
	}
}

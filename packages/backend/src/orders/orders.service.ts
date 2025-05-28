import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrdersDto } from './dto/create-orders.dto';
import { UpdateOrdersDto } from './dto/update-orders.dto';
import { DeliveryStatus, PaymentStatus, Prisma } from '@prisma/client';

type FilterPaymentStatus = PaymentStatus | 'ALL';
type FilterDeliveryStatus = DeliveryStatus | 'ALL';

@Injectable()
export class OrdersService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateOrdersDto) {
		return this.prisma.order.create({
			data: dto,
		});
	}

	async findAll(
		sortDate?: 'asc' | 'desc',
		deliveryStatus?: FilterDeliveryStatus,
		paymentStatus?: FilterPaymentStatus,
		page = 1,
		limit = 10,
	) {
		const skip = (Number(page) - 1) * Number(limit);

		const where: Prisma.OrderWhereInput = {
			...(deliveryStatus &&
				deliveryStatus !== 'ALL' && { deliveryStatus }),
			...(paymentStatus && paymentStatus !== 'ALL' && { paymentStatus }),
		};

		console.log('Filter values:', { deliveryStatus, paymentStatus });
		console.log('Where clause:', where);

		const orderBy: Prisma.OrderOrderByWithRelationInput = sortDate
			? { createdAt: sortDate }
			: {};

		const [items, total] = await Promise.all([
			this.prisma.order.findMany({
				where,
				orderBy,
				skip,
				take: Number(limit),
				include: {
					user: true,
					orderDetails: true,
				},
			}),
			this.prisma.order.count({ where }),
		]);

		console.log('Found items:', items.length);
		console.log(
			'Items payment statuses:',
			items.map((item) => item.paymentStatus),
		);

		return { items, total };
	}

	async findOne(orderId: string) {
		const order = await this.prisma.order.findUnique({
			where: { orderId },
		});
		if (!order) throw new NotFoundException('Orders not found');
		return order;
	}

	async update(order_id: string, dto: UpdateOrdersDto) {
		try {
			return await this.prisma.order.update({
				where: { orderId: order_id },
				data: dto,
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}

	async delete(order_id: string) {
		try {
			return await this.prisma.order.delete({
				where: { orderId: order_id },
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}
}

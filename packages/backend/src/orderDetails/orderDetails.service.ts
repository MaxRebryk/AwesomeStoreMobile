import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDetailsBodyDto } from './dto/create-orderDetails.dto';
import { UpdateOrderDetailsDto } from './dto/update-orderDetails.dto';

@Injectable()
export class OrderDetailsService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateOrderDetailsBodyDto & { orderId: string }) {
		const product = await this.prisma.products.findUnique({
			where: { uid: dto.productId },
			select: { price: true },
		});

		if (!product) {
			throw new NotFoundException('Product not found');
		}

		const orderDetail = await this.prisma.ordersDetail.create({
			data: {
				orderId: dto.orderId,
				productId: dto.productId,
				quantity: dto.quantity,
				priceAtPurchase: product.price,
			},
		});

		const orderDetails = await this.prisma.ordersDetail.findMany({
			where: { orderId: dto.orderId },
		});

		const totalAmount = orderDetails.reduce(
			(total, detail) => total + detail.priceAtPurchase * detail.quantity,
			0,
		);

		await this.prisma.order.update({
			where: { orderId: dto.orderId },
			data: { totalAmount },
		});

		return orderDetail;
	}

	async findAll(page = 1, limit = 10, userId?: string) {
		const skip = (Number(page) - 1) * Number(limit);
		const where = userId
			? {
					order: {
						userId: userId,
					},
				}
			: {};

		const [items, total] = await Promise.all([
			this.prisma.ordersDetail.findMany({
				where,
				skip,
				take: Number(limit),
				include: {
					order: true,
					product: true,
				},
			}),
			this.prisma.ordersDetail.count({ where }),
		]);

		return { items, total };
	}

	async findOne(orderDetailId: string) {
		const orderDetail = await this.prisma.ordersDetail.findUnique({
			where: { orderDetailId },
		});
		if (!orderDetail) throw new NotFoundException('Order detail not found');
		return orderDetail;
	}

	async update(orderDetailId: string, dto: UpdateOrderDetailsDto) {
		try {
			return await this.prisma.ordersDetail.update({
				where: { orderDetailId },
				data: dto,
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}

	async delete(orderDetailId: string) {
		try {
			return await this.prisma.ordersDetail.delete({
				where: { orderDetailId },
			});
		} catch (error) {
			throw new NotFoundException(error);
		}
	}

	async removeProductFromOrder(orderDetailId: string) {
		const orderDetail = await this.prisma.ordersDetail.findUnique({
			where: { orderDetailId },
			include: {
				order: true,
				product: true,
			},
		});

		if (!orderDetail) {
			throw new NotFoundException('Order detail not found');
		}

		const product = await this.prisma.products.findUnique({
			where: { uid: orderDetail.productId },
		});

		if (!product) {
			throw new NotFoundException('Product not found');
		}

		await this.prisma.ordersDetail.delete({
			where: { orderDetailId },
		});

		const remainingDetails = await this.prisma.ordersDetail.findMany({
			where: { orderId: orderDetail.orderId },
		});

		if (remainingDetails.length === 0) {
			await this.prisma.order.delete({
				where: { orderId: orderDetail.orderId },
			});
			return {
				message: 'Order deleted as it has no details left',
				updatedStock: product.inStock,
			};
		}

		const totalAmount = remainingDetails.reduce(
			(total, detail) => total + detail.priceAtPurchase * detail.quantity,
			0,
		);

		await this.prisma.order.update({
			where: { orderId: orderDetail.orderId },
			data: { totalAmount },
		});

		return {
			message: 'Product removed from order successfully',
			updatedStock: product.inStock,
		};
	}
}

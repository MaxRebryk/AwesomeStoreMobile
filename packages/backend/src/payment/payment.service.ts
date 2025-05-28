import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
	constructor(private prisma: PrismaService) {}

	private getPaymentStatus(): PaymentStatus {
		const random = Math.round(Math.random());
		return random === 0 ? PaymentStatus.FAILED : PaymentStatus.COMPLETE;
	}

	async createPayment(createPaymentDto: CreatePaymentDto) {
		const paymentStatus = this.getPaymentStatus();

		const payment = await this.prisma.payment.create({
			data: {
				orderId: createPaymentDto.orderId,
				totalAmount: createPaymentDto.totalAmount,
				paymentStatus,
				...(createPaymentDto.transactionId && {
					transactionId: createPaymentDto.transactionId,
				}),
			},
		});

		await this.prisma.order.update({
			where: {
				orderId: createPaymentDto.orderId,
			},
			data: {
				paymentStatus,
			},
		});

		return payment;
	}

	async findAll() {
		return this.prisma.payment.findMany({
			include: {
				order: true,
			},
		});
	}

	async findOne(paymentId: string) {
		return this.prisma.payment.findUnique({
			where: {
				paymentId,
			},
			include: {
				order: true,
			},
		});
	}

	async findByOrderId(orderId: string) {
		return this.prisma.payment.findMany({
			where: {
				orderId,
			},
			include: {
				order: true,
			},
		});
	}
}

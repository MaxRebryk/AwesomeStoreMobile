import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class OrderAccessGuard implements CanActivate {
	constructor(private prisma: PrismaService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		const orderId = request.params.orderId || request.body.orderId;
		const orderDetailId = request.params.orderDetailId;

		if (user.role === Role.ADMIN) {
			return true;
		}

		let orderUserId: string | undefined;

		if (orderId) {
			const order = await this.prisma.order.findUnique({
				where: { orderId },
				select: { userId: true },
			});

			if (!order) {
				throw new ForbiddenException('Order not found');
			}

			orderUserId = order.userId;
		} else if (orderDetailId) {
			const orderDetail = await this.prisma.ordersDetail.findUnique({
				where: { orderDetailId },
				select: {
					order: {
						select: { userId: true },
					},
				},
			});

			if (!orderDetail) {
				throw new ForbiddenException('Order detail not found');
			}

			orderUserId = orderDetail.order.userId;
		} else {
			throw new BadRequestException(
				'Order ID or Order Detail ID is required',
			);
		}

		if (orderUserId !== user.uid) {
			throw new ForbiddenException(
				'You do not have access to this order',
			);
		}

		return true;
	}
}

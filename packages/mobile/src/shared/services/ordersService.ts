import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';
import { IOrderDetail } from './orderDetailsService';
import { PaymentStatus, DeliveryStatus } from 'src/shared/types/order';

export interface IOrder {
	orderId: string;
	userId: string;
	totalAmount: number;
	deliveryStatus: DeliveryStatus;
	paymentStatus: PaymentStatus;
	createdAt: string;
}

export interface IUser {
	uid: string;
	email: string;
	name: string;
	phoneNumber: string;
	shippingAddress: string;
	role: string;
}

export interface IOrderItems extends IOrder {
	user: IUser;
	orderDetails: IOrderDetail[];
}

export interface IOrderResponse {
	items: IOrderItems[];
	total: number;
}

export class OrdersService extends HttpService {
	constructor(private readonly httpService: HttpService) {
		super(mainAxios);
	}

	async getOrders(
		sortDate?: 'asc' | 'desc',
		deliveryStatus?: DeliveryStatus,
		paymentStatus?: PaymentStatus,
		page = 1,
		limit = 10,
	): Promise<IOrderResponse> {
		const params = {
			sortDate,
			deliveryStatus,
			paymentStatus,
			page,
			limit,
			include: ['orderDetails.product'],
		};
		return this.get<IOrderResponse>('order', { params });
	}

	async createOrder(payload: {
		userId: string;
		totalAmount: number;
		paymentStatus?: PaymentStatus;
		deliveryStatus?: DeliveryStatus;
	}) {
		return this.post<IOrder, typeof payload>('/order', payload);
	}

	async removeOrderDetail(id: string): Promise<IOrder> {
		return this.delete<IOrder>(`order/${id}`);
	}
}

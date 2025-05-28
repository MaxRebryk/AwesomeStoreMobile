import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';
import { IOrder } from './ordersService';
import { IProduct } from './productsService';

export interface IOrderDetail {
	orderDetailId: string;
	orderId: string;
	productId: string;
	quantity: number;
	priceAtPurchase: number;
	order: IOrder;
	product: IProduct;
}

export class OrderDetailsService extends HttpService {
	constructor(private readonly httpService: HttpService) {
		super(mainAxios);
	}

	async getOrderDetails(orderId: string): Promise<IOrderDetail[]> {
		return this.get<IOrderDetail[]>(`order-details/${orderId}`);
	}

	async createOrderDetail(
		orderId: string,
		payload: {
			productId: string;
			quantity: number;
		},
	) {
		return this.post<IOrderDetail, typeof payload>(
			`order-details/${orderId}`,
			payload,
		);
	}

	async removeProductFromOrder(
		orderDetailId: string,
		orderId: string,
	): Promise<{ message: string; updatedStock: number }> {
		return this.delete<{ message: string; updatedStock: number }>(
			`order-details/remove-product/${orderDetailId}`,
			{
				data: {
					orderId,
				},
			},
		);
	}
}

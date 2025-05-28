import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';

interface IPaymentPayload {
	orderId: string;
	totalAmount: number;
}

export class PaymentService extends HttpService {
	constructor(private readonly httpService: HttpService) {
		super(mainAxios);
	}

	async createPayment(payload: { orderId: string; totalAmount: number }) {
		return this.post<IPaymentPayload, typeof payload>('/payments', payload);
	}
}

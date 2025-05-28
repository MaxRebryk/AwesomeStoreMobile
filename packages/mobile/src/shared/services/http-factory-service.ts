import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';
import { ProductsService } from './productsService';
import { AuthService } from './authService';
import { OrderDetailsService } from './orderDetailsService';
import { OrdersService } from './ordersService';
import { PaymentService } from './paymentService';
import { UserService } from './userService';

export class HttpFactoryService {
	public createHttpService(): HttpService {
		return new HttpService(mainAxios);
	}

	public createProductsService(): ProductsService {
		return new ProductsService(this.createHttpService());
	}

	public createAuthService(): AuthService {
		return new AuthService(this.createHttpService());
	}

	public createOrdersService(): OrdersService {
		return new OrdersService(this.createHttpService());
	}

	public createOrderDetailsService(): OrderDetailsService {
		return new OrderDetailsService(this.createHttpService());
	}

	public createPaymentService(): PaymentService {
		return new PaymentService(this.createHttpService());
	}
	public createUserService(): UserService {
		return new UserService(this.createHttpService());
	}
}

export const httpFactory = new HttpFactoryService();

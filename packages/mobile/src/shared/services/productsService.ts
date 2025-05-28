import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';

export interface IProduct {
	uid: string;
	name: string;
	description: string;
	price: number;
	inStock: number;
	category: string;
	amount: number;
}

interface IProductsResponse {
	items: IProduct[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export class ProductsService extends HttpService {
	constructor(private readonly httpService: HttpService) {
		super(mainAxios);
	}

	async getProducts(
		name?: string,
		sort?: 'asc' | 'desc',
		page = 1,
		limit = 10,
	): Promise<IProductsResponse> {
		return this.get<IProductsResponse>('products', {
			params: { name, sort, page, limit },
		});
	}

	async getProduct(id: string): Promise<IProduct> {
		return this.get<IProduct>(`products/${id}`);
	}
}

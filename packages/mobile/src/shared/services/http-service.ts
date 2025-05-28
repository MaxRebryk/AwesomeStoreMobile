import type {
	IHttpClient,
	IHttpConfig,
	IMap,
	IResponse,
} from '../services/types';

const SERVER_URL = process.env.EXPO_PUBLIC_API_KEY ?? '';

export class HttpService {
	constructor(
		private readonly fetchingService: IHttpClient,
		private readonly baseUrl: string = SERVER_URL,
	) {
		this.fetchingService = fetchingService;
		this.baseUrl = baseUrl;
	}

	public createQueryLink(base: string, args: IMap): string {
		let url = `${base}?`;

		Object.keys(args).forEach((parameter) => {
			if (typeof args[parameter] !== 'undefined') {
				url = `${url}&${parameter}=${String(args[parameter])}`;
			}
		});

		return url;
	}

	public async get<T>(url: string, config?: IHttpConfig): Promise<T> {
		const response = await this.fetchingService.get<T>(
			this.getFullApiUrl(url),
			{
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			},
		);
		this.checkResponseStatus(response);
		return response.data;
	}

	public async post<T, TD>(
		url: string,
		data: TD,
		config?: IHttpConfig,
	): Promise<T> {
		const response = await this.fetchingService.post<T, TD>(
			this.getFullApiUrl(url),
			data,
			{
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			},
		);
		this.checkResponseStatus(response);
		return response.data;
	}

	public async put<T, TD>(
		url: string,
		data: TD,
		config?: IHttpConfig,
	): Promise<T> {
		const response = await this.fetchingService.put<T, TD>(
			this.getFullApiUrl(url),
			data,
			{
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			},
		);
		this.checkResponseStatus(response);
		return response.data;
	}

	public async patch<T, TD>(
		url: string,
		data: TD,
		config?: IHttpConfig,
	): Promise<T> {
		const response = await this.fetchingService.patch<T, TD>(
			this.getFullApiUrl(url),
			data,
			{
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			},
		);
		this.checkResponseStatus(response);
		return response.data;
	}

	public async delete<T>(url: string, config?: IHttpConfig): Promise<T> {
		const response = await this.fetchingService.delete<T>(
			this.getFullApiUrl(url),
			{
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			},
		);
		this.checkResponseStatus(response);
		return response.data;
	}

	public populateContentTypeHeaderConfig(): Record<string, string> {
		return {
			'Content-Type': 'application/json',
		};
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
	}

	private async checkResponseStatus<T>(result: IResponse<T>): Promise<void> {
		if (result.status >= 400 && result.status < 600) {
			const errorData = {
				response: {
					status: result.status,
					data: result.data,
				},
			};

			throw new Error(JSON.stringify(errorData));
		}
	}
}

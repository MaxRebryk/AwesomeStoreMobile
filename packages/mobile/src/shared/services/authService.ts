import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';

interface ILoginPayload {
	email: string;
	password: string;
}

interface IRegisterPayload {
	email: string;
	password: string;
	name: string;
	shippingAddress: string;
	phoneNumber: string;
}

interface IAuthResponse {
	uid: string;
	token: string;
	email: string;
	password: string;
	name: string;
	phoneNumber: string;
	shippingAddress: string;
	role: string;
}

export class AuthService extends HttpService {
	constructor(private readonly httpService: HttpService) {
		super(mainAxios);
	}

	async login(payload: ILoginPayload): Promise<IAuthResponse> {
		return this.post<IAuthResponse, ILoginPayload>('auth/login', payload);
	}

	async register(payload: IRegisterPayload): Promise<IAuthResponse> {
		return this.post<IAuthResponse, IRegisterPayload>(
			'auth/register',
			payload,
		);
	}

	async sendCode(email: string): Promise<void> {
		return this.post<void, { email: string }>('email/send-code', { email });
	}

	async verify(code: string, email: string): Promise<String> {
		return this.post<String, { code: string; email: string }>(
			'email/verify-code',
			{
				code,
				email,
			},
		);
	}
}

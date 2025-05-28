import { HttpService } from './http-service';
import { mainAxios } from './mainAxios';

interface IUserPayloadUpdate {
	name?: string;
	phoneNumber?: string;
	shippingAddress?: string;
}

interface IPasswordUpdate {
	currentPassword: string;
	newPassword: string;
}

export class UserService extends HttpService {
	constructor(private readonly httpService: HttpService) {
		super(mainAxios);
	}
	async updateUser(uid: string, data: IUserPayloadUpdate) {
		return this.patch<String, IUserPayloadUpdate>(`users/${uid}`, data);
	}

	async updatePassword(uid: string, data: IPasswordUpdate) {
		return this.patch<String, IPasswordUpdate>(
			`users/${uid}/password`,
			data,
		);
	}

	async deleteUser(uid: string) {
		return this.delete(`users/${uid}`);
	}
}

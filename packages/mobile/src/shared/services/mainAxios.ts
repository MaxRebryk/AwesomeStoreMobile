import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useAuthState } from '../../zustand/store';

export const mainAxios = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
	withCredentials: true,
});

mainAxios.interceptors.request.use(
	(config) => {
		const token = useAuthState.getState().token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => {
		return response;
	},
	async (error) => {
		if (Boolean(error.response) && error.response.status === 401) {
			useAuthState.getState().setToken('');
		}
		return Promise.reject(error);
	},
);

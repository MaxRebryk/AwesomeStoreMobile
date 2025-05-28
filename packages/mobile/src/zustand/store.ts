import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IProduct } from 'src/shared/services/productsService';
import { IUser } from 'src/shared/services/ordersService';

export interface AuthState {
	token: string | null;
	user: IUser | null;
	setToken: (token: string) => void;
	setUser: (user: IUser | null) => void;
	clearUser: () => void;
	clearToken: () => void;
}

export interface CartState {
	products: (IProduct & { amount: number })[] | null;
	setProducts: (products: (IProduct & { amount: number })[]) => void;
	clearProducts: () => void;
}

export const useAuthState = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			user: null,
			setToken: (token) => set({ token }),
			setUser: (user) => set({ user }),
			clearToken: () => set({ token: null }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			products: null,
			setProducts: (products) => set({ products }),
			clearProducts: () => set({ products: null }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

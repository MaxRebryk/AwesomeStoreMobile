import { Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useAuthState, useCartStore } from 'src/zustand/store';
import { styles } from './style';
import { CartList } from '../../components/cartList/CartList';
import Header from 'src/shared/components/header/Header';
import Button from 'src/shared/components/button/button.component';
import { HttpFactoryService } from 'src/shared/services/http-factory-service';
import { PaymentStatus, DeliveryStatus } from 'src/shared/types/order';

const CartScreen = () => {
	const { products, clearProducts } = useCartStore();
	const { user } = useAuthState();
	const httpFactory = new HttpFactoryService();
	const orderService = httpFactory.createOrdersService();
	const orderDetailsService = httpFactory.createOrderDetailsService();

	const totalPrice =
		products?.reduce((sum, product) => {
			return sum + product.price * product.amount;
		}, 0) || 0;

	const createOrder = async () => {
		try {
			if (!products?.length) return;
			if (!user?.uid) {
				console.log('User not found');
				return;
			}

			const order = await orderService.createOrder({
				userId: user.uid,
				totalAmount: totalPrice,
				paymentStatus: PaymentStatus.PENDING,
				deliveryStatus: DeliveryStatus.PENDING,
			});

			console.log('Order created:', order);

			for (const product of products) {
				const _orderDetail =
					await orderDetailsService.createOrderDetail(order.orderId, {
						productId: product.uid,
						quantity: product.amount,
					});
			}

			clearProducts();
		} catch (error) {
			console.log('Error creating order:', error);
			if (error instanceof Error) {
				console.log('Error details:', error.message);
			}
		}
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<Header backButtonOn={true} title={'Cart'} cartIconOn={true} />
			<Text style={styles.mainText}>Total amount: ${totalPrice}</Text>
			<CartList products={products} />
			<Button
				title={'Create Order'}
				onPress={createOrder}
				isActive={!!products?.length}
			/>
		</SafeAreaView>
	);
};

export default CartScreen;

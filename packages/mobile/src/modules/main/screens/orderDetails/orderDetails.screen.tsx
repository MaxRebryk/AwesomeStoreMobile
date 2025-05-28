import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderDetails from '../../components/orderDetails/OrderDetails';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { IOrderItems } from 'src/shared/services/ordersService';
import Header from 'src/shared/components/header/Header';
import { styles } from './style';
import Button from 'src/shared/components/button/button.component';
import { HttpFactoryService } from 'src/shared/services/http-factory-service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OrderDetailsScreen() {
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.ORDER_DETAILS>
		>();
	const navigation = useNavigation<NavigationProp>();

	const { order } = route.params as { order: IOrderItems };

	const httpFactory = new HttpFactoryService();
	const paymentService = httpFactory.createPaymentService();

	const createPayment = async () => {
		try {
			const request = paymentService.createPayment({
				orderId: order.orderId,
				totalAmount: order.totalAmount,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleOrderDeleted = () => {
		navigation.goBack();
	};

	const handlePay = () => {
		createPayment();
		navigation.navigate(NAVIGATION_KEYS.PAYMENT_SUCCEFUL);
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<Header
				backButtonOn={true}
				title={'Order details'}
				cartIconOn={false}
			/>
			<View style={styles.content}>
				<OrderDetails
					order={order}
					onOrderDeleted={handleOrderDeleted}
				/>
			</View>
			{order.paymentStatus === 'COMPLETE' && (
				<Button
					isActive={false}
					title={'Payment Completed'}
					onPress={() => {}}
				/>
			)}
			{order.paymentStatus !== 'COMPLETE' && (
				<Button isActive={true} title={'Pay'} onPress={handlePay} />
			)}
		</SafeAreaView>
	);
}

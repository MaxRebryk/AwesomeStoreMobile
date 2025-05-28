import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style';

import { IOrderDetail } from 'src/shared/services/orderDetailsService';
import { HttpFactoryService } from 'src/shared/services/http-factory-service';
import { IProduct } from 'src/shared/services/productsService';
import Delete from '../../../../../assets/icons/delete.svg';
import { IOrder } from 'src/shared/services/ordersService';

interface OrderDetailCardProps {
	orderDetail: IOrderDetail;
	onDelete?: () => void;
	order: IOrder;
}

const OrderDetailCard = ({
	orderDetail,
	onDelete,
	order,
}: OrderDetailCardProps) => {
	const totalPrice = orderDetail.priceAtPurchase * orderDetail.quantity;
	const httpFactory = new HttpFactoryService();
	const productService = httpFactory.createProductsService();
	const orderDetailsService = httpFactory.createOrderDetailsService();
	const [product, setProdcut] = useState<IProduct>();

	const getProductInfo = async () => {
		try {
			const productResponse = await productService.getProduct(
				orderDetail.productId,
			);
			setProdcut(productResponse);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteDetail = async () => {
		try {
			const request = await orderDetailsService.removeProductFromOrder(
				orderDetail.orderDetailId,
				orderDetail.orderId,
			);
			onDelete?.();
		} catch (error) {
			console.log('Error deleting order detail:', error);
			if (error instanceof Error) {
				console.log('Error details:', error.message);
			}
		}
	};

	useEffect(() => {
		getProductInfo();
	}, []);

	return (
		<View style={styles.item}>
			<View style={styles.firstRow}>
				<Text style={styles.simpleText}>{product?.name}</Text>
			</View>

			<View style={styles.mainTextContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.boldText}>Total: </Text>
					<Text style={styles.simpleText}>${totalPrice}</Text>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.boldText}>Amount: </Text>
					<Text style={styles.simpleText}>
						{orderDetail.quantity}
					</Text>
				</View>
			</View>
			{order.paymentStatus !== 'COMPLETE' && (
				<TouchableOpacity
					onPress={() => {
						deleteDetail();
					}}
				>
					<View style={styles.deleteButton}>
						<Delete width={20} height={20} />
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default OrderDetailCard;

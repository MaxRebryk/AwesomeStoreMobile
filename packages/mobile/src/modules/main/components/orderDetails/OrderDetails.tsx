import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { IOrderItems } from 'src/shared/services/ordersService';
import { IOrderDetail } from 'src/shared/services/orderDetailsService';
import OrderDetailCard from '../orderDetailCard/OrderDetailCard';
import { styles } from './style';

interface IOrderDetailsProps {
	order: IOrderItems;
	onOrderDeleted?: () => void;
}

export default function OrderDetails({
	order,
	onOrderDeleted,
}: IOrderDetailsProps) {
	const [orderDetails, setOrderDetails] = useState(order.orderDetails);

	const handleDelete = (deletedOrderDetailId: string) => {
		setOrderDetails((prev) => {
			const newDetails = prev.filter(
				(detail) => detail.orderDetailId !== deletedOrderDetailId,
			);

			if (newDetails.length === 0) {
				onOrderDeleted?.();
				return [];
			}
			return newDetails;
		});
	};

	if (orderDetails.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.totalText}>
				Total amount: ${order.totalAmount}
			</Text>
			<View style={styles.listContainer}>
				<FlatList
					data={orderDetails}
					renderItem={({ item }: { item: IOrderDetail }) => {
						return (
							<OrderDetailCard
								orderDetail={item}
								onDelete={() =>
									handleDelete(item.orderDetailId)
								}
								order={order}
							/>
						);
					}}
					keyExtractor={(item) => item.orderDetailId}
					ListEmptyComponent={<Text>No items found</Text>}
					contentContainerStyle={styles.listContent}
				/>
			</View>
		</View>
	);
}

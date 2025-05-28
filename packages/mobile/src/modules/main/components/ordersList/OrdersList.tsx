import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { IOrderItems } from 'src/shared/services/ordersService';
import { styles } from './style';
import OrderCard from '../orderCard/OrderCard';

interface IOrderListProps {
	orders: IOrderItems[];
	onOrderDeleted?: (orderId: string) => void;
}

export default function OrdersList({
	orders,
	onOrderDeleted,
}: IOrderListProps) {
	const validOrders = orders.filter((order) => order.orderDetails.length > 0);

	return (
		<View style={styles.container}>
			<FlatList
				data={validOrders}
				renderItem={({ item }) => (
					<OrderCard
						order={item}
						onOrderDeleted={() => onOrderDeleted?.(item.orderId)}
					/>
				)}
				keyExtractor={(item) => item.orderId}
				ListEmptyComponent={<Text>No orders found</Text>}
			/>
		</View>
	);
}

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { IOrderItems } from 'src/shared/services/ordersService';
import { styles } from './style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useNavigation } from '@react-navigation/native';

interface IOrdeerCardProps {
	order: IOrderItems;
	onOrderDeleted?: () => void;
}

export default function OrderCard({ order, onOrderDeleted }: IOrdeerCardProps) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('uk-UA', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.ORDER_DETAILS, {
			order,
			onOrderDeleted,
		});
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={styles.mainWrapper}>
				<View>
					<Text style={styles.mainText}>Date:</Text>
					<Text style={styles.sideText}>
						{formatDate(order.createdAt)}
					</Text>
				</View>
				<View>
					<Text style={styles.mainText}>ID:</Text>
					<Text style={styles.sideText}>{order.orderId}</Text>
				</View>
				<View>
					<Text style={styles.mainText}>Payment Status:</Text>
					<Text style={styles.sideText}>{order.paymentStatus}</Text>
				</View>
				<View>
					<Text style={styles.mainText}>Delivery Status:</Text>
					<Text style={styles.sideText}>{order.deliveryStatus}</Text>
				</View>
				<View>
					<Text style={styles.mainText}>Total:</Text>
					<Text style={styles.sideText}>${order.totalAmount}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

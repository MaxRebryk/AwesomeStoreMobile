import { Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'src/shared/components/header/Header';
import { styles } from './style';
import OrdersList from '../../components/ordersList/OrdersList';
import { HttpFactoryService } from 'src/shared/services/http-factory-service';
import { IOrderItems } from 'src/shared/services/ordersService';
import {
	DeliveryStatus,
	PaymentStatus,
	DateFilter,
} from 'src/shared/types/order';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomModal from '../../components/bottomModal/BottomModal';
import { useFocusEffect } from '@react-navigation/native';

const OrdersScreen = () => {
	const httpFactory = new HttpFactoryService();
	const ordersService = httpFactory.createOrdersService();
	const [orders, setOrders] = useState<IOrderItems[]>([]);
	const [paymentFilter, setPaymentFilter] = useState<PaymentStatus>(
		PaymentStatus.ALL,
	);
	const [deliveryFilter, setDeliveryFilter] = useState<DeliveryStatus>(
		DeliveryStatus.ALL,
	);
	const [dateFilter, setDateFilter] = useState<DateFilter>('desc');
	const [activeFilter, setActiveFilter] = useState<
		'payment' | 'delivery' | 'date'
	>('payment');

	const paymentFilterLabels: Record<PaymentStatus, string> = {
		ALL: 'All',
		PENDING: 'Pending',
		COMPLETE: 'Complete',
		FAILED: 'Failed',
	};

	const deliveryFilterLabels: Record<DeliveryStatus, string> = {
		ALL: 'All',
		PENDING: 'Pending',
		IN_TRANSIT: 'In Transit',
		DELIVERED: 'Delivered',
	};

	const dateFilterLabels: Record<DateFilter, string> = {
		all: 'All',
		asc: 'Asc > Desc',
		desc: 'Asc < Desc',
	};

	const bottomSheetRef = useRef<BottomSheet>(null);

	const fetchOrders = async () => {
		try {
			const params = {
				sortDate: dateFilter === 'all' ? undefined : dateFilter,
				deliveryStatus:
					deliveryFilter === DeliveryStatus.ALL
						? undefined
						: deliveryFilter,
				paymentStatus:
					paymentFilter === PaymentStatus.ALL
						? undefined
						: paymentFilter,
				page: 1,
				limit: 100,
			};

			const response = await ordersService.getOrders(
				params.sortDate,
				params.deliveryStatus,
				params.paymentStatus,
				params.page,
				params.limit,
			);
			setOrders(response.items);
		} catch (error) {
			console.log('Error fetching orders:', error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			fetchOrders();
		}, [dateFilter, deliveryFilter, paymentFilter]),
	);

	const handleOpen = (filterType: 'payment' | 'delivery' | 'date') => {
		setActiveFilter(filterType);
		if (bottomSheetRef.current) {
			bottomSheetRef.current.snapToIndex(0);
		}
	};

	const handleClose = () => {
		if (bottomSheetRef.current) {
			bottomSheetRef.current.snapToIndex(-1);
		}
	};

	const handlePaymentFilterChange = (status: PaymentStatus) => {
		setPaymentFilter(status);
		handleClose();
	};

	const handleDeliveryFilterChange = (status: DeliveryStatus) => {
		setDeliveryFilter(status);
		handleClose();
	};

	const handleDateFilterChange = (status: DateFilter) => {
		setDateFilter(status);
		handleClose();
	};

	const handleOrderDeleted = (orderId: string) => {
		setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
	};

	return (
		<>
			<SafeAreaView style={styles.mainWrapper}>
				<Header
					backButtonOn={false}
					title={'Orders'}
					cartIconOn={false}
				/>
				<View style={styles.contentContainer}>
					<View style={styles.filterWrapper}>
						<View style={styles.filterHeaderWrapper}>
							<Text style={styles.mainText}>Filter by</Text>
						</View>
						<View style={styles.funcFilterWrapper}>
							<View style={styles.funcFilterButtons}>
								<TouchableOpacity
									onPress={() => handleOpen('payment')}
								>
									<Text style={styles.mainText}>
										Payment:{' '}
									</Text>
									<Text style={styles.filterText}>
										{paymentFilterLabels[paymentFilter]}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.funcFilterButtons}>
								<TouchableOpacity
									onPress={() => handleOpen('delivery')}
								>
									<Text style={styles.mainText}>
										Delivery:{' '}
									</Text>
									<Text style={styles.filterText}>
										{deliveryFilterLabels[deliveryFilter]}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.funcFilterButtons}>
								<TouchableOpacity
									onPress={() => handleOpen('date')}
								>
									<Text style={styles.mainText}>Date: </Text>
									<Text style={styles.filterText}>
										{dateFilterLabels[dateFilter]}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.ordersListContainer}>
						<OrdersList
							orders={orders}
							onOrderDeleted={handleOrderDeleted}
						/>
					</View>
				</View>
				<BottomModal
					bottomSheetRef={bottomSheetRef}
					filterType={activeFilter}
					activePaymentFilter={paymentFilter}
					activeDeliveryFilter={deliveryFilter}
					activeDateFilter={dateFilter}
					onPaymentFilterChange={handlePaymentFilterChange}
					onDeliveryFilterChange={handleDeliveryFilterChange}
					onDateFilterChange={handleDateFilterChange}
				/>
			</SafeAreaView>
		</>
	);
};

export default OrdersScreen;

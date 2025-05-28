import { View, StyleSheet } from 'react-native';
import React, { RefObject } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
	PaymentStatus,
	DeliveryStatus,
	DateFilter,
} from 'src/shared/types/order';
import ModalButtons from '../modalButtons/modalButtons';

interface IBottomModalProps {
	bottomSheetRef: RefObject<BottomSheet>;
	activePaymentFilter?: PaymentStatus;
	activeDeliveryFilter?: DeliveryStatus;
	activeDateFilter?: DateFilter;
	onPaymentFilterChange?: (status: PaymentStatus) => void;
	onDeliveryFilterChange?: (status: DeliveryStatus) => void;
	onDateFilterChange?: (status: DateFilter) => void;
	filterType: 'payment' | 'delivery' | 'date';
}

export default function BottomModal({
	bottomSheetRef,
	activePaymentFilter,
	activeDeliveryFilter,
	activeDateFilter,
	onPaymentFilterChange,
	onDeliveryFilterChange,
	onDateFilterChange,
	filterType,
}: IBottomModalProps) {
	const snapPoints = ['50%'];

	const getTitle = () => {
		switch (filterType) {
			case 'payment':
				return 'Payment Status';
			case 'delivery':
				return 'Delivery Status';
			case 'date':
				return 'Date Status';
		}
	};

	return (
		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={snapPoints}
			enablePanDownToClose
			backgroundStyle={styles.background}
		>
			<BottomSheetView style={styles.contentContainer}>
				<ModalButtons
					title={getTitle()}
					filterType={filterType}
					activePaymentFilter={activePaymentFilter}
					activeDeliveryFilter={activeDeliveryFilter}
					activeDateFilter={activeDateFilter}
					onPaymentFilterChange={onPaymentFilterChange}
					onDeliveryFilterChange={onDeliveryFilterChange}
					onDateFilterChange={onDateFilterChange}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'white',
	},
	contentContainer: {
		flex: 1,
		padding: 20,
	},
});

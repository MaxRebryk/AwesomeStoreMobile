import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
	PaymentStatus,
	DeliveryStatus,
	DateFilter,
} from 'src/shared/types/order';
import Checkmark from '../../../../../assets/icons/checkmark-circle.svg';
import { styles } from './style';

type FilterType = 'payment' | 'delivery' | 'date';

interface IModalButtonsProps {
	title: string;
	filterType: FilterType;
	activePaymentFilter?: PaymentStatus;
	activeDeliveryFilter?: DeliveryStatus;
	activeDateFilter?: DateFilter;
	onPaymentFilterChange?: (status: PaymentStatus) => void;
	onDeliveryFilterChange?: (status: DeliveryStatus) => void;
	onDateFilterChange?: (status: DateFilter) => void;
}

export default function ModalButtons({
	title,
	filterType,
	activePaymentFilter,
	activeDeliveryFilter,
	activeDateFilter,
	onPaymentFilterChange,
	onDeliveryFilterChange,
	onDateFilterChange,
}: IModalButtonsProps) {
	const isActive = (value: PaymentStatus | DeliveryStatus | DateFilter) => {
		switch (filterType) {
			case 'payment':
				return value === activePaymentFilter;
			case 'delivery':
				return value === activeDeliveryFilter;
			case 'date':
				return value === activeDateFilter;
		}
	};

	const renderButtons = () => {
		switch (filterType) {
			case 'payment':
				return (
					<>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onPaymentFilterChange?.(PaymentStatus.ALL)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(PaymentStatus.ALL) &&
											styles.activeText,
									]}
								>
									All
								</Text>
								{isActive(PaymentStatus.ALL) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onPaymentFilterChange?.(PaymentStatus.PENDING)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(PaymentStatus.PENDING) &&
											styles.activeText,
									]}
								>
									Pending
								</Text>
								{isActive(PaymentStatus.PENDING) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onPaymentFilterChange?.(PaymentStatus.COMPLETE)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(PaymentStatus.COMPLETE) &&
											styles.activeText,
									]}
								>
									Complete
								</Text>
								{isActive(PaymentStatus.COMPLETE) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onPaymentFilterChange?.(PaymentStatus.FAILED)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(PaymentStatus.FAILED) &&
											styles.activeText,
									]}
								>
									Failed
								</Text>
								{isActive(PaymentStatus.FAILED) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
					</>
				);
			case 'delivery':
				return (
					<>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onDeliveryFilterChange?.(DeliveryStatus.ALL)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(DeliveryStatus.ALL) &&
											styles.activeText,
									]}
								>
									All
								</Text>
								{isActive(DeliveryStatus.ALL) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onDeliveryFilterChange?.(DeliveryStatus.PENDING)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(DeliveryStatus.PENDING) &&
											styles.activeText,
									]}
								>
									Pending
								</Text>
								{isActive(DeliveryStatus.PENDING) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onDeliveryFilterChange?.(
									DeliveryStatus.IN_TRANSIT,
								)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(DeliveryStatus.IN_TRANSIT) &&
											styles.activeText,
									]}
								>
									In Transit
								</Text>
								{isActive(DeliveryStatus.IN_TRANSIT) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								onDeliveryFilterChange?.(
									DeliveryStatus.DELIVERED,
								)
							}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive(DeliveryStatus.DELIVERED) &&
											styles.activeText,
									]}
								>
									Delivered
								</Text>
								{isActive(DeliveryStatus.DELIVERED) && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
					</>
				);
			case 'date':
				return (
					<>
						<TouchableOpacity
							style={styles.button}
							onPress={() => onDateFilterChange?.('all')}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive('all') && styles.activeText,
									]}
								>
									All
								</Text>
								{isActive('all') && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => onDateFilterChange?.('asc')}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive('asc') && styles.activeText,
									]}
								>
									Asc {'>'} Desc
								</Text>
								{isActive('asc') && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={() => onDateFilterChange?.('desc')}
						>
							<View style={styles.buttonContent}>
								<Text
									style={[
										styles.buttonText,
										isActive('desc') && styles.activeText,
									]}
								>
									Asc {'<'} Desc
								</Text>
								{isActive('desc') && (
									<Checkmark width={20} height={20} />
								)}
							</View>
						</TouchableOpacity>
					</>
				);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={styles.buttonsContainer}>{renderButtons()}</View>
		</View>
	);
}

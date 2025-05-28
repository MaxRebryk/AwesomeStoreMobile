import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './style';
import { IProduct } from 'src/shared/services/productsService';

interface IProductInfoProps {
	product: IProduct;
	amount: number;
	setAmount: (amount: number | ((prev: number) => number)) => void;
}

export default function ProductInfo({
	product,
	amount,
	setAmount,
}: IProductInfoProps) {
	const onMinusPress = (prev: number) => {
		if (prev > 0) {
			setAmount(prev - 1);
		} else {
			setAmount(0);
		}
	};

	return (
		<View>
			<View style={styles.contentWrapper}>
				<View>
					<Text style={styles.contentTitle}>Name: </Text>
					<Text style={styles.contentText}>{product.name}</Text>
				</View>
				<View>
					<Text style={styles.contentTitle}>Description:</Text>
					<Text style={styles.contentText}>
						{product.description}
					</Text>
				</View>
				<View>
					<Text style={styles.contentTitle}>In Stock:</Text>
					<Text style={styles.contentText}>{product.inStock}</Text>
				</View>
				<View>
					<Text style={styles.contentTitle}>Price:</Text>
					<Text style={styles.contentText}>{product.price}</Text>
				</View>
				<View>
					<Text style={styles.contentTitle}>Category:</Text>
					<Text style={styles.contentText}>{product.category}</Text>
				</View>
				<Text style={styles.contentTitle}>Amount:</Text>
			</View>
			<View style={styles.funcWrapper}>
				<TouchableOpacity
					style={styles.minusButton}
					onPress={() => onMinusPress(amount)}
				>
					<Text style={styles.buttonText}>-</Text>
				</TouchableOpacity>
				<View style={styles.amountWrapper}>
					<Text style={styles.amountText}>{amount}</Text>
				</View>
				<TouchableOpacity
					style={styles.plusButton}
					onPress={() => setAmount((prev: number) => prev + 1)}
				>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

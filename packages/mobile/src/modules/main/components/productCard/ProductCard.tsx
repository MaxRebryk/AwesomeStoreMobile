import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { IProduct } from 'src/shared/services/productsService';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

interface ProductCardProps {
	product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handleLink = () => {
		navigation.navigate(NAVIGATION_KEYS.PRODUCT, { product });
	};

	return (
		<TouchableOpacity onPress={handleLink}>
			<View style={styles.item}>
				<View style={styles.firstRow}>
					<Text style={styles.simpleText}>{product.name}</Text>
					<View style={styles.textContainer}>
						<Text style={styles.boldText}>Price: </Text>
						<Text style={styles.simpleText}>${product.price}</Text>
					</View>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.boldText}>Category: </Text>
					<Text style={styles.simpleText}>{product.category}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProductCard;

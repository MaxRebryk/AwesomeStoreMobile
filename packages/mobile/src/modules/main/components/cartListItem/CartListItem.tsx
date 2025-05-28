import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './style';
import { IProduct } from 'src/shared/services/productsService';
import Delete from '../../../../../assets/icons/delete.svg';
import { useCartStore } from 'src/zustand/store';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CartListItemProps {
	item: IProduct & { amount: number };
}

export const CartListItem = ({ item }: CartListItemProps) => {
	const { products, setProducts } = useCartStore();

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handleDelete = () => {
		const updatedProducts =
			products?.filter((product) => product.uid !== item.uid) || [];
		setProducts(updatedProducts);
	};

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate(NAVIGATION_KEYS.EDIT_CART, {
					product: item,
				});
			}}
		>
			<View style={styles.container}>
				<Text style={styles.name}>{item.name}</Text>
				<View style={styles.productInfoWrapper}>
					<View style={styles.productInfoSemiWrapper}>
						<Text style={styles.mainText}>Total: </Text>
						<Text style={styles.SemiText}>
							${item.price * item.amount}
						</Text>
					</View>
					<View style={styles.productInfoSemiWrapper}>
						<Text style={styles.mainText}>Amount: </Text>
						<Text style={styles.SemiText}>{item.amount}</Text>
					</View>
				</View>
				<View style={styles.deleteButton}>
					<TouchableOpacity onPress={handleDelete}>
						<Delete width={20}> height={20}</Delete>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
};

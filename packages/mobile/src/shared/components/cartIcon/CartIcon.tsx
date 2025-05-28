import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CartIcon from '../../../../assets/icons/cart.svg';
import styles from './style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from 'src/zustand/store';

export default function Cart() {
	const cartProducts = useCartStore();

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.CART);
	};

	return (
		<View style={styles.mainWrapper}>
			<TouchableOpacity onPress={handlePress}>
				<CartIcon height={22.74} width={24} />
				<View style={styles.countBackground}>
					<Text style={styles.countText}>
						{cartProducts.products
							? cartProducts.products.length
							: 0}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

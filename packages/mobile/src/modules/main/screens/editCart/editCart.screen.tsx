import { Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './style';
import Header from 'src/shared/components/header/Header';
import { useCartStore } from 'src/zustand/store';
import ProductInfo from '../../components/productInfo/ProductInfo';
import Button from '../../../../shared/components/button/button.component';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function EditCartScreen() {
	const route =
		useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.EDIT_CART>>();
	const { product } = route.params;
	const { products, setProducts } = useCartStore();
	const [amount, setAmount] = useState(product.amount);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handleUpdateCart = () => {
		if (amount === 0) {
			handleRemoveFromCart();
			return;
		}

		const updatedProducts =
			products?.map((p) => {
				if (p.uid === product.uid) {
					return { ...p, amount };
				}
				return p;
			}) || [];

		setProducts(updatedProducts);
	};

	const handleRemoveFromCart = () => {
		const updatedProducts =
			products?.filter((p) => p.uid !== product.uid) || [];
		setProducts(updatedProducts);
		navigation.navigate(NAVIGATION_KEYS.CART);
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<Header
				backButtonOn={true}
				title={'Product information'}
				cartIconOn={true}
			/>
			<View style={styles.productInfoWrapper}>
				<ProductInfo
					product={product}
					amount={amount}
					setAmount={setAmount}
				/>
			</View>
			<View style={styles.removeButton}>
				<TouchableOpacity onPress={handleRemoveFromCart}>
					<Text style={styles.removeButtonText}>
						Remove from the cart
					</Text>
				</TouchableOpacity>
			</View>
			<Button
				title="Save"
				onPress={handleUpdateCart}
				isActive={amount > 0}
			/>
		</SafeAreaView>
	);
}

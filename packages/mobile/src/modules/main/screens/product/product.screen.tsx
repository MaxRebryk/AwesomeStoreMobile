import { SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { styles } from './style';
import Header from 'src/shared/components/header/Header';
import { useCartStore } from 'src/zustand/store';
import ProductInfo from '../../components/productInfo/ProductInfo';
import Button from 'src/shared/components/button/button.component';

export default function ProductScreen() {
	const route =
		useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.PRODUCT>>();

	const { product } = route.params;
	const { setProducts } = useCartStore();
	const [amount, setAmount] = useState(0);

	const handleAddToCart = () => {
		const currentProducts = useCartStore.getState().products || [];

		const existingProductIndex = currentProducts.findIndex(
			(p) => p.uid === product.uid,
		);

		if (existingProductIndex !== -1) {
			const updatedProducts = [...currentProducts];
			updatedProducts[existingProductIndex] = {
				...updatedProducts[existingProductIndex],
				amount: updatedProducts[existingProductIndex].amount + amount,
			};

			setProducts(updatedProducts);
		} else {
			const newProducts = [...currentProducts, { ...product, amount }];

			setProducts(newProducts);
		}
		setAmount(0);
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
			<Button
				title="Add to Cart"
				onPress={handleAddToCart}
				isActive={amount > 0}
			/>
		</SafeAreaView>
	);
}

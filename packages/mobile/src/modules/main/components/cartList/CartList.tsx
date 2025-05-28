import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { styles } from './style';
import { CartListItem } from '../cartListItem/CartListItem';
import { IProduct } from 'src/shared/services/productsService';

interface CartListProps {
	products: (IProduct & { amount: number })[] | null;
}

export const CartList = ({ products }: CartListProps) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				renderItem={({ item }) => <CartListItem item={item} />}
				keyExtractor={(item) => item.uid}
				ListEmptyComponent={
					<Text style={styles.emptyText}>Cart is Empty</Text>
				}
			/>
			<View style={styles.totalContainer}></View>
		</View>
	);
};

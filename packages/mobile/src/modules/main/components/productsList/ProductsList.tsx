import { View, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import ProductCard from '../productCard/ProductCard';
import { IProduct } from 'src/shared/services/productsService';
import { styles } from './style';

interface ProductsListProps {
	products: IProduct[];
	onLoadMore: () => void;
	isLoading: boolean;
	onRefresh: () => void;
	refreshing?: boolean;
}

const ProductsList = ({
	products,
	onLoadMore,
	isLoading,
	onRefresh,
	refreshing = false,
}: ProductsListProps) => {
	const renderFooter = () => {
		if (!isLoading) return null;
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	};

	return (
		<View style={styles.listWrapper}>
			<FlatList
				data={products}
				renderItem={({ item }: { item: IProduct }) => (
					<ProductCard product={item} />
				)}
				keyExtractor={(item) => item.uid}
				onEndReached={onLoadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={renderFooter}
				ListEmptyComponent={<Text>Data not Found</Text>}
				onRefresh={onRefresh}
				refreshing={refreshing}
			/>
		</View>
	);
};

export default ProductsList;

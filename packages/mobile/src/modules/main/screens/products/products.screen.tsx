import { TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './style';

import { Input } from '../../../../shared/components/input';
import { useForm } from 'react-hook-form';
import { httpFactory } from 'src/shared/services/http-factory-service';
import { IProduct } from 'src/shared/services/productsService';
import ProductsList from '../../components/productsList/ProductsList';
import { useDebounceEffect } from '../../../../shared/hooks/useDebounceEffect';
import ArrowDown from './../../../../../assets/icons/arrow-down.svg';
import ArrowUp from './../../../../../assets/icons/arrow-up.svg';
import Cancel from '../../../../../assets/icons/cancel.svg';
import Header from 'src/shared/components/header/Header';

interface SearchData {
	searchValue: string;
}

const ProductsScreen = () => {
	const productsService = httpFactory.createProductsService();
	const [products, setProducts] = useState<IProduct[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [sort, setSort] = useState<'asc' | 'desc' | undefined>(undefined);

	const { control, watch } = useForm<SearchData>({
		defaultValues: {
			searchValue: '',
		},
	});

	const searchValue = watch('searchValue');

	const sortMap: Record<string, 'asc' | 'desc' | undefined> = {
		asc: 'asc',
		desc: 'desc',
		cancel: undefined,
	};

	const searchProducts = async () => {
		try {
			const response = await productsService.getProducts(searchValue);
			setProducts(response.items);
			setPage(1);
			loadProducts(searchValue, 1, true, sort);
		} catch (error) {
			console.log(error);
		}
	};

	const loadProducts = async (
		search: string,
		pageNum: number,
		isNewSearch: boolean,
		sort: 'asc' | 'desc' | undefined,
	) => {
		try {
			setIsLoading(true);
			const response = await productsService.getProducts(
				search,
				sort,
				pageNum,
			);
			if (isNewSearch) {
				setProducts(response.items);
			} else {
				setProducts((prev) => [...prev, ...response.items]);
			}
			setHasMore(pageNum < response.totalPages);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoadMore = () => {
		if (!isLoading && hasMore) {
			const nextPage = page + 1;
			setPage(nextPage);
			loadProducts(searchValue, nextPage, false, sort);
		}
	};

	const handleFilter = (label: string) => {
		setSort(sortMap[label]);
	};

	const handleRefresh = () => {
		setPage(1);
		loadProducts(searchValue, 1, true, sort);
	};

	useDebounceEffect(searchProducts, [searchValue, sort], 500);

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<Header backButtonOn={false} title={'Products'} cartIconOn={true} />
			<Input
				name={'searchValue'}
				control={control}
				placeholder={'Enter product name'}
				defaultValue={''}
			/>
			<View style={styles.filterButtonsWrapper}>
				<TouchableOpacity
					onPress={() => {
						handleFilter('desc');
					}}
				>
					<ArrowDown width={25} height={25} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						handleFilter('asc');
					}}
				>
					<ArrowUp width={25} height={25} />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						handleFilter('cancel');
					}}
				>
					<Cancel width={25} height={25} />
				</TouchableOpacity>
			</View>
			<ProductsList
				products={products}
				onLoadMore={handleLoadMore}
				isLoading={isLoading}
				refreshing={false}
				onRefresh={handleRefresh}
			/>
		</SafeAreaView>
	);
};

export default ProductsScreen;

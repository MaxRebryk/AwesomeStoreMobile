import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NAVIGATION_KEYS,
	TabStackParamList,
} from '../../types/navigation.type';
import ProductsScreen from 'src/modules/main/screens/products/products.screen';
import OrdersScreen from '../../../main/screens/orders/orders.screen';
import SettingsScreen from '../../../main/screens/settings/settings.screen';
import ProductsIcon from '../../../../../assets/icons/products.svg';
import OrdersIcon from '../../../../../assets/icons/orders.svg';
import SettingsIcon from '../../../../../assets/icons/settings.svg';
import { TAB_OPTIONS } from '../../constants';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={TAB_OPTIONS}>
			<Tab.Screen
				name={NAVIGATION_KEYS.PRODUCTS_TAB}
				component={ProductsScreen}
				options={{
					tabBarLabel: 'Products',
					tabBarIcon: ({ color }) => (
						<ProductsIcon
							width={20}
							height={21.75}
							fill={color}
							stroke={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.ORDERS_TAB}
				component={OrdersScreen}
				options={{
					tabBarLabel: 'Orders',
					tabBarIcon: ({ color }) => (
						<OrdersIcon
							width={20}
							height={24.2}
							fill={color}
							stroke={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.SETTINGS_TAB}
				component={SettingsScreen}
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<SettingsIcon
							width={20}
							height={21.21}
							fill={'transparent'}
							stroke={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;

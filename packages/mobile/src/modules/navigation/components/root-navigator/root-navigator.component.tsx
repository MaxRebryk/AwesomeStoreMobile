import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavContainer } from '../nav-container/nav-container.component';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '../../types/navigation.type';
import { SCREEN_OPTIONS, TAB_OPTIONS } from '../../constants';

import { LoginScreen } from '../../../auth/screens/login/login.screen';
import RegisterScreen from '../../../auth/screens/register/register.screen';
import VerificationScreen from 'src/modules/auth/screens/verification/verification.screen';
import VerifyCompleteScreen from 'src/modules/auth/screens/verifyComplete/verifyComplete.screen';
import ProductsScreen from 'src/modules/main/screens/products/products.screen';
import TabNavigator from '../tab-navigator/tabNavigator';
import { useAuthState } from 'src/zustand/store';
import ProductScreen from 'src/modules/main/screens/product/product.screen';
import CartScreen from 'src/modules/main/screens/cart/cart.screen';
import EditCartScreen from 'src/modules/main/screens/editCart/editCart.screen';
import OrderDetails from 'src/modules/main/components/orderDetails/OrderDetails';
import OrderDetailsScreen from 'src/modules/main/screens/orderDetails/orderDetails.screen';
import PaymentSuccessfulScreen from 'src/modules/main/screens/paymentSuccess/paymentSucces.screen';
import PersonalInfoScreen from 'src/modules/main/screens/personalInfo/PersonalInfo.screen';
import ChangePasswordScreen from 'src/modules/main/screens/changePassword/ChangePassword.screen';
import TermsScreen from 'src/modules/main/screens/terms/Terms.screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
	const token = useAuthState((state) => state.token);
	const isAuthenticated = Boolean(token);

	return (
		<NavContainer>
			<Stack.Navigator screenOptions={SCREEN_OPTIONS}>
				{isAuthenticated ? (
					<>
						<Stack.Screen
							name={NAVIGATION_KEYS.TABS}
							component={TabNavigator}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PRODUCTS}
							component={ProductsScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PRODUCT}
							component={ProductScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.CART}
							component={CartScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.EDIT_CART}
							component={EditCartScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.ORDER_DETAILS}
							component={OrderDetailsScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PAYMENT_SUCCEFUL}
							component={PaymentSuccessfulScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.PERSONAL_INFO}
							component={PersonalInfoScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.CHANGE_PASSWORD}
							component={ChangePasswordScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.TERMS}
							component={TermsScreen}
						/>
					</>
				) : (
					<>
						<Stack.Screen
							name={NAVIGATION_KEYS.LOGIN}
							component={LoginScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.REGISTER}
							component={RegisterScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.VERIFICATION}
							component={VerificationScreen}
						/>
						<Stack.Screen
							name={NAVIGATION_KEYS.VERIFYCOMPLETE}
							component={VerifyCompleteScreen}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavContainer>
	);
};

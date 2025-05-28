import { View } from 'react-native';
import React from 'react';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Success from '../../../../shared/components/success/Success';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const PaymentSuccessfulScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.TABS);
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View style={styles.empty}></View>
			<View style={styles.contentWrapper}>
				<Success
					text={'Payment successful!'}
					handlePress={handlePress}
					buttonTitle="Ok"
				></Success>
			</View>
		</SafeAreaView>
	);
};

export default PaymentSuccessfulScreen;

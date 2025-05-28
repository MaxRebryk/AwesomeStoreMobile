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

const VerifyCompleteScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View style={styles.contentWrapper}>
				<Success
					text={'Account successfully registered!'}
					handlePress={handlePress}
					buttonTitle="Sign In"
				></Success>
			</View>
		</SafeAreaView>
	);
};

export default VerifyCompleteScreen;

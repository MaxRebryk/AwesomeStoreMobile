import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VerificationForm from '../../components/VerificationForm/VerificationForm';
import styles from './style';
import Button from '../../../../shared/components/button/button.component';
import Toast from 'react-native-toast-message';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { httpFactory } from 'src/shared/services/http-factory-service';
import toast from 'src/shared/utils/toast';

const authService = httpFactory.createAuthService();

export default function VerificationScreen() {
	const [verificationCode, setVerificationCode] = useState('');
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const route =
		useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.VERIFICATION>>();

	const { email } = route.params;

	React.useEffect(() => {
		const request = async () => {
			try {
				const response = authService.sendCode(email);
				return response;
			} catch (_error) {
				toast('error', 'Code Does not Sent', '');
			}
		};
		request();
	}, [email]);

	const handleInputChange = (text: string) => {
		setVerificationCode(text);
	};

	const handlePress = async () => {
		try {
			const response = await authService.verify(verificationCode, email);

			Toast.show({
				type: 'success',
				text1: 'Верифікація успішна!',
			});

			navigation.navigate(NAVIGATION_KEYS.VERIFYCOMPLETE);
		} catch (_error) {
			toast('error', 'Invalid verification code', '');
		}
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View>
				<Text style={styles.mainText}>Email Verification</Text>
				<VerificationForm onInputChange={handleInputChange} />
			</View>
			<View>
				<Button title="Submit" onPress={handlePress} isActive={true} />
			</View>
		</SafeAreaView>
	);
}

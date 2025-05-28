import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from 'src/shared/components/input';
import { useForm } from 'react-hook-form';
import styles from './style';
import Button from 'src/shared/components/button/button.component';
import Hided from '../../../../../assets/icons/hided.svg';
import Shown from '../../../../../assets/icons/shown.svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { httpFactory } from 'src/shared/services/http-factory-service';
import toast from 'src/shared/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from 'src/shared/validation/inputsValidation';

type FormData = {
	email: string;
	name: string;
	phoneNumber: string;
	shippingAddress: string;
	password: string;
	confirmPassword: string;
};

const authService = httpFactory.createAuthService();

export default function RegisterScreen() {
	const [securePassword, setSecurePassword] = React.useState(true);
	const [securePasswordConfirm, setSecurePasswordConfirm] =
		React.useState(true);

	const { control, handleSubmit } = useForm<FormData>({
		resolver: yupResolver(registerSchema),
	});

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onSubmit = async (payload: FormData) => {
		try {
			const { confirmPassword: _confrimPassword, ...rest } = payload;
			const _response = await authService.register(rest);
			toast('success', 'Register Completed', '');

			navigation.navigate(NAVIGATION_KEYS.VERIFICATION, {
				email: payload.email,
			});
		} catch (_error) {
			toast('error', 'Register Error', 'Check Your Data');
		}
	};

	const toggleSecurePassword = () => {
		if (securePassword) {
			setSecurePassword(false);
		} else {
			setSecurePassword(true);
		}
	};

	const toggleSecurePasswordConfirm = () => {
		if (securePasswordConfirm) {
			setSecurePasswordConfirm(false);
		} else {
			setSecurePasswordConfirm(true);
		}
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View style={styles.mainTextWrapper}>
				<Text>Sign Up</Text>
			</View>

			<View>
				<Input
					name="email"
					control={control}
					defaultValue=""
					label="Email"
				/>
				<Input
					name="name"
					control={control}
					defaultValue=""
					label="Full Name"
				/>
				<Input
					name="phoneNumber"
					control={control}
					defaultValue=""
					label="Phone Number"
				/>
				<Input
					name="shippingAddress"
					control={control}
					defaultValue=""
					label="Shipping Address"
				/>
				<View style={styles.passwordInputWrapper}>
					<Input
						name="password"
						control={control}
						defaultValue=""
						label="Password"
						isSecure={securePassword}
					/>
					<TouchableOpacity
						onPress={toggleSecurePassword}
						style={styles.passwordHideButton}
					>
						{securePassword ? (
							<Hided height={18.86} width={20} />
						) : (
							<Shown height={18.86} width={20} />
						)}
					</TouchableOpacity>
				</View>
				<View style={styles.passwordInputWrapper}>
					<Input
						name="confirmPassword"
						control={control}
						defaultValue=""
						label="Confirm Password"
						isSecure={securePasswordConfirm}
					/>
					<TouchableOpacity
						onPress={toggleSecurePasswordConfirm}
						style={styles.passwordHideButton}
					>
						{securePasswordConfirm ? (
							<Hided height={18.86} width={20} />
						) : (
							<Shown height={18.86} width={20} />
						)}
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.footerWrapper}>
				<Button
					title="Sign up"
					onPress={handleSubmit(onSubmit)}
					isActive={true}
				/>
				<View style={styles.footerTextWrapper}>
					<Text style={styles.footerText}>
						Have you already registered?{' '}
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(NAVIGATION_KEYS.LOGIN)
						}
					>
						<Text style={styles.footerLink}>Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

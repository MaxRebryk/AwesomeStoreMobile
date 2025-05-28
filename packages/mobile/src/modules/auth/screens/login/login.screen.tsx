import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { Input } from 'src/shared/components/input';
import styles from './styles';
import Logo from '../../../../../assets/icons/Vector.svg';
import Hided from '../../../../../assets/icons/hided.svg';
import Shown from '../../../../../assets/icons/shown.svg';
import Button from '../../../../shared/components/button/button.component';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { httpFactory } from '../../../../shared/services/http-factory-service';
import { AxiosError } from 'axios';
import { useAuthState } from '../../../../zustand/store';
import toast from 'src/shared/utils/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../../shared/validation/inputsValidation';

type FormData = {
	email: string;
	password: string;
};

const authService = httpFactory.createAuthService();

export const LoginScreen = () => {
	const { control, handleSubmit } = useForm<FormData>({
		resolver: yupResolver(loginSchema),
	});

	const [secure, setSecure] = React.useState(true);

	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onSubmit = async (payload: FormData) => {
		try {
			const response = await authService.login(payload);

			useAuthState.getState().setToken(response.token);
			const user = {
				uid: response.uid,
				userPassord: response.password,
				email: response.email,
				name: response.name,
				phoneNumber: response.phoneNumber,
				role: response.role,
				shippingAddress: response.shippingAddress,
			};
			useAuthState.getState().setUser(user);
			toast('success', 'Login Successful', '');
		} catch (error: unknown) {
			const axiosError = error as AxiosError<{ message: string }>;

			console.log(axiosError);

			if (
				axiosError?.response?.data?.message === 'Email is not verified'
			) {
				toast('info', 'Need Confirm Email', 'Check Email');
				navigation.navigate(NAVIGATION_KEYS.VERIFICATION, {
					email: payload.email,
				});
				return;
			}
			toast('error', 'Login Error', 'Check your Email or Password');
		}
	};

	const toggleSecure = () => {
		if (secure) {
			setSecure(false);
		} else {
			setSecure(true);
		}
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View style={styles.logoWrapper}>
				<Logo height={38.25} width={43.22}></Logo>
				<Text style={styles.mainText}>Awesome Store</Text>
			</View>
			<View style={styles.contentWrapper}>
				<View>
					<Input<FormData>
						name="email"
						control={control}
						defaultValue=""
						label="Email"
					/>
					<View style={styles.passwordInputWrapper}>
						<Input<FormData>
							name="password"
							control={control}
							defaultValue=""
							label="Password"
							isSecure={secure}
						/>
						<TouchableOpacity
							onPress={toggleSecure}
							style={styles.passwordHideButton}
						>
							{secure ? (
								<Hided height={18.86} width={20} />
							) : (
								<Shown height={18.86} width={20} />
							)}
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.footerWrapper}>
					<Button
						title={'Sign in'}
						onPress={handleSubmit(onSubmit)}
						isActive={true}
					></Button>
					<View style={styles.footerTextWrapper}>
						<Text style={styles.footerText}>
							Don't have an account?{' '}
						</Text>
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.REGISTER)
							}
						>
							<Text style={styles.footerLink}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

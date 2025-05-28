import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from 'src/shared/components/header/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { Input } from 'src/shared/components/input';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'src/zustand/store';
import Button from 'src/shared/components/button/button.component';
import { HttpFactoryService } from 'src/shared/services/http-factory-service';
import toast from 'src/shared/utils/toast';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import Hided from '../../../../../assets/icons/hided.svg';
import Shown from '../../../../../assets/icons/shown.svg';

type FormData = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export default function ChangePassword() {
	const AuthState = useAuthState();
	const user = AuthState.user;
	const HttpFactory = new HttpFactoryService();
	const usersService = HttpFactory.createUserService();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const { control, handleSubmit } = useForm<FormData>({});

	const [secureCurrent, setSecureCurrent] = useState(true);
	const [secureNew, setSecureNew] = useState(true);
	const [secureConfirm, setSecureConfirm] = useState(true);

	const onSubmit = async (data: FormData) => {
		try {
			if (!user?.uid) {
				toast('error', 'Error', 'User ID is missing');
				return;
			}
			if (data.newPassword !== data.confirmPassword) {
				toast('error', 'Error', 'Passwords do not match');
				return;
			}
			await usersService.updatePassword(user.uid, {
				currentPassword: data.currentPassword,
				newPassword: data.newPassword,
			});
			toast(
				'success',
				'Password Updated',
				'Your password has been updated successfully',
			);
			navigation.navigate(NAVIGATION_KEYS.TABS);
		} catch (error) {
			console.log(error);
			toast('error', 'Update Failed', 'Failed to update your password');
		}
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View>
				<Header
					backButtonOn={true}
					title={'Change password'}
					cartIconOn={false}
				/>
			</View>
			<View style={styles.inputWrapper}>
				<View style={styles.passwordInputWrapper}>
					<Input<FormData>
						name="currentPassword"
						control={control}
						defaultValue=""
						label="Current Password"
						isSecure={false}
						textContentType="none"
						autoComplete="off"
					/>
					<TouchableOpacity
						onPress={() => setSecureCurrent(!secureCurrent)}
						style={styles.passwordHideButton}
					></TouchableOpacity>
				</View>
				<View style={styles.passwordInputWrapper}>
					<Input<FormData>
						name="newPassword"
						control={control}
						defaultValue=""
						label="New Password"
						isSecure={secureNew}
						textContentType="none"
						autoComplete="off"
					/>
					<TouchableOpacity
						onPress={() => setSecureNew(!secureNew)}
						style={styles.passwordHideButton}
					>
						{secureNew ? (
							<Hided height={18.86} width={20} />
						) : (
							<Shown height={18.86} width={20} />
						)}
					</TouchableOpacity>
				</View>
				<View style={styles.passwordInputWrapper}>
					<Input<FormData>
						name="confirmPassword"
						control={control}
						defaultValue=""
						label="Confirm New Password"
						isSecure={secureConfirm}
						textContentType="none"
						autoComplete="off"
					/>
					<TouchableOpacity
						onPress={() => setSecureConfirm(!secureConfirm)}
						style={styles.passwordHideButton}
					>
						{secureConfirm ? (
							<Hided height={18.86} width={20} />
						) : (
							<Shown height={18.86} width={20} />
						)}
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<Button
					isActive={true}
					title={'Save'}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</SafeAreaView>
	);
}

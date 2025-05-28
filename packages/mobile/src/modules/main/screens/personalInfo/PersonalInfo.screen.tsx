import { View, Text, TouchableOpacity, Modal } from 'react-native';
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

type FormData = {
	email: string;
	name: string;
	phoneNumber: string;
	shippingAddress: string;
};

export default function PersonalInfoScreen() {
	const AuthState = useAuthState();
	const user = AuthState.user;

	const userEmail = user?.email || '';
	const userName = user?.name || '';
	const userNumber = user?.phoneNumber || '';
	const userShippingAddress = user?.shippingAddress || '';
	const HttpFactory = new HttpFactoryService();
	const usersService = HttpFactory.createUserService();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const { control, handleSubmit } = useForm<FormData>({});

	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

	const onSubmit = async (data: FormData) => {
		try {
			if (!user?.uid) {
				toast('error', 'Error', 'User ID is missing');
				return;
			}
			const updatedUser = await usersService.updateUser(user.uid, data);
			AuthState.setUser({ ...user, ...updatedUser });
			toast(
				'success',
				'Profile Updated',
				'Your information has been updated successfully',
			);
			navigation.navigate(NAVIGATION_KEYS.TABS);
		} catch (error) {
			console.log(error);
			toast(
				'error',
				'Update Failed',
				'Failed to update your information',
			);
		}
	};

	const handleDeleteAccount = () => {
		setIsDeleteModalVisible(true);
	};

	const confirmDelete = async () => {
		try {
			if (!user?.uid) {
				toast('error', 'Error', 'User ID is missing');
				return;
			}
			await usersService.deleteUser(user.uid);
			AuthState.clearToken();
			AuthState.setUser(null);
			navigation.navigate(NAVIGATION_KEYS.LOGIN);
			toast(
				'success',
				'Account Deleted',
				'Your account has been deleted successfully',
			);
		} catch (error) {
			console.log(error);
			toast('error', 'Delete Failed', 'Failed to delete your account');
		} finally {
			setIsDeleteModalVisible(false);
		}
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<View>
				<Header
					backButtonOn={true}
					title={'Personal Info'}
					cartIconOn={false}
				/>
			</View>
			<View style={styles.inputWrapper}>
				<Input<FormData>
					name="email"
					control={control}
					defaultValue={userEmail}
					label="Email"
					disabled={true}
				/>
				<Input<FormData>
					name="name"
					control={control}
					defaultValue={userName}
					label="Full name"
				/>
				<Input<FormData>
					name="phoneNumber"
					control={control}
					defaultValue={userNumber}
					label="Phone number"
				/>
				<Input<FormData>
					name="shippingAddress"
					control={control}
					defaultValue={userShippingAddress}
					label="Shipping address"
				/>
			</View>
			<View style={styles.deleteButton}>
				<TouchableOpacity onPress={handleDeleteAccount}>
					<Text style={styles.deleteText}>Delete Account</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Button
					isActive={true}
					title={'Save'}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>

			<Modal
				animationType="fade"
				transparent={true}
				visible={isDeleteModalVisible}
				onRequestClose={() => setIsDeleteModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>
							Are you sure you want to delete your account?
						</Text>
						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[
									styles.modalButton,
									styles.cancelButton,
								]}
								onPress={() => setIsDeleteModalVisible(false)}
							>
								<Text style={styles.cancelButtonText}>No</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.modalButton,
									styles.deleteModalButton,
								]}
								onPress={confirmDelete}
							>
								<Text style={styles.deleteButtonText}>Yes</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}

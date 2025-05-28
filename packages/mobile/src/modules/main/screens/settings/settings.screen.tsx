import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from 'src/shared/components/button/button.component';
import { useAuthState } from 'src/zustand/store';
import Header from 'src/shared/components/header/Header';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

const SettingsScreen = () => {
	const logout = useAuthState((state) => state.clearToken);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleLogout = () => {
		logout();
	};

	return (
		<SafeAreaView style={styles.mainWrapper}>
			<Header
				backButtonOn={false}
				title={'Settings'}
				cartIconOn={false}
			/>
			<View style={styles.settingsButtonsWrapper}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate(NAVIGATION_KEYS.PERSONAL_INFO)
					}
				>
					<View style={styles.buttons}>
						<Text style={styles.simpleButtonsText}>
							Personal info
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(NAVIGATION_KEYS.CHANGE_PASSWORD);
					}}
				>
					<View style={styles.buttons}>
						<Text style={styles.simpleButtonsText}>
							Change password
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity>
					<View style={styles.buttons}>
						<Text style={styles.simpleButtonsText}>FAQ</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate(NAVIGATION_KEYS.TERMS);
					}}
				>
					<View style={styles.buttons}>
						<Text style={styles.simpleButtonsText}>
							Terms & Conditions
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogout}>
					<View style={styles.buttons}>
						<Text style={styles.attentionButtonsText}>Logout</Text>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SettingsScreen;

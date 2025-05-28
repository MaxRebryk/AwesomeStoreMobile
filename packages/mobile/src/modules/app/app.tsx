import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '../navigation/components/root-navigator/root-navigator.component';
import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
	const [fontsLoaded] = useFonts({
		KaushanScript: require('../../../assets/fonts/KaushanScript-Regular.ttf'),
		Poppins: require('../../../assets/fonts/Poppins.ttf'),
		PoppinsBold: require('../../../assets/fonts/Poppins-Bold.ttf'),
		PoppinsSemiBold: require('../../../assets/fonts/Poppins-SemiBold.ttf'),
		Inter: require('../../../assets/fonts/Inter.ttf'),
	});

	if (!fontsLoaded) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>Loading fonts...</Text>
			</View>
		);
	}

	return (
		<GestureHandlerRootView>
			<SafeAreaProvider>
				<RootNavigator />
				<Toast />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};

export default App;

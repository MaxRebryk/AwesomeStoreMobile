import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { RootNavigator } from 'src/modules/navigation/components/root-navigator/root-navigator.component';

export const App = () => {
	const [fontsLoaded] = useFonts({
		KaushanScript: require('../../../assets/fonts//KaushanScript-Regular.ttf'),
		Poppins: require('../../../assets/fonts/Poppins.ttf'),
		PoppinsBold: require('../../../assets/fonts/Poppins-Bold.ttf'),
		PoppinsSemiBold: require('../../../assets/fonts/Poppins-SemiBold.ttf'),
		Inter: require('../../../assets/fonts/Inter.ttf'),
	});

	if (!fontsLoaded) {
		return <Text>Loading fonts...</Text>;
	}

	return (
		<SafeAreaProvider>
			<RootNavigator />
			<Toast></Toast>
		</SafeAreaProvider>
	);
};

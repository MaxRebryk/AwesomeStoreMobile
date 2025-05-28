import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'src/shared/components/header/Header';
import { styles } from './style';

export default function TermsScreen() {
	return (
		<SafeAreaView style={styles.mainWrapper}>
			<Header
				backButtonOn={true}
				title={'Terms & Conditions'}
				cartIconOn={false}
			></Header>
			<View>
				<Text>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Esse cumque modi tempore quaerat eum ipsam necessitatibus,
					quisquam dolor voluptas asperiores amet illum reprehenderit
					odit mollitia voluptatibus quo nostrum ipsum rerum!
				</Text>
			</View>
		</SafeAreaView>
	);
}

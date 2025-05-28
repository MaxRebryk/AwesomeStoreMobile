import { TouchableOpacity } from 'react-native';
import React from 'react';
import Back from '../../../../assets/icons/back.svg';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handlePressBack = () => {
		navigation.navigate(NAVIGATION_KEYS.TABS);
	};

	return (
		<TouchableOpacity
			onPress={handlePressBack}
			hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
		>
			<Back width={16} height={28.44} />
		</TouchableOpacity>
	);
}

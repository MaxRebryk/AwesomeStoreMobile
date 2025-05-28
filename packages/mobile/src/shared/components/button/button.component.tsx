import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style';

export interface IButtonProps {
	title: string;
	onPress: () => void;
	isActive: boolean;
}

export default function Button({ title, onPress, isActive }: IButtonProps) {
	return (
		<TouchableOpacity
			style={isActive ? styles.wrapper : styles.wrapperNonActive}
			onPress={onPress}
		>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
}

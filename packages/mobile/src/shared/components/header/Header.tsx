import { View, Text } from 'react-native';
import React from 'react';
import styles from './style';
import BackButton from '../../components/backButton/backButton';
import CartIcon from '../cartIcon/CartIcon';

interface IHeaderProps {
	backButtonOn: boolean;
	cartIconOn: boolean;
	title: string;
}

export default function Header({
	backButtonOn,
	cartIconOn,
	title,
}: IHeaderProps) {
	return (
		<View style={styles.headerWrapper}>
			<View style={styles.leftSection}>
				{backButtonOn && <BackButton />}
			</View>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.rightSection}>
				{cartIconOn && <CartIcon />}
			</View>
		</View>
	);
}

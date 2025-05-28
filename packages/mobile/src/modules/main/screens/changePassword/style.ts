import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';

export const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		backgroundColor: COLORS.Background,
		marginHorizontal: 15,
	},
	inputWrapper: {
		marginBottom: 'auto',
	},
	passwordInputWrapper: {
		position: 'relative',
	},
	passwordHideButton: {
		position: 'absolute',
		right: 10,
		top: 35,
		zIndex: 1,
	},
});

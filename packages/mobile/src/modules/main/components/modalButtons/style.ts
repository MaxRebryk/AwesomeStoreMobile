import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	container: {},
	titleContainer: {
		marginBottom: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	buttonsContainer: {
		gap: 10,
	},
	button: {
		padding: 15,
		borderRadius: 8,
		alignItems: 'flex-start',
	},
	buttonContent: {
		flexDirection: 'row',
		gap: 10,
	},
	buttonText: {
		fontSize: 16,
	},
	activeText: {
		color: COLORS.ParamsColor,
	},
});

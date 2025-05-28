import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		backgroundColor: COLORS.Background,
		marginHorizontal: 15,
	},
	productInfoWrapper: {
		marginBottom: 20,
	},
	removeButton: {
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 'auto',
	},
	removeButtonText: {
		fontFamily: FONTS.PoppinsSemiBold,
		color: COLORS.AttentionColor,
		fontSize: 16,
	},
});

import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	contentWrapper: {
		gap: 10,
	},
	contentTitle: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
		color: COLORS.MainTextColor,
	},
	contentText: {
		fontFamily: FONTS.Poppins,
		fontSize: 16,
		color: COLORS.MainTextColor,
	},

	funcWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 10,
		marginBottom: 'auto',
	},
	minusButton: {
		width: 46,
		height: 48,
		borderRadius: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.ButtonDisabled,
	},
	plusButton: {
		width: 46,
		height: 48,
		borderRadius: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.ButtonActive,
	},
	buttonText: {
		fontFamily: FONTS.Inter,
		fontSize: 24,
		color: COLORS.ButtonTextColor,
	},
	amountWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 44,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.ButtonDisabled,
		backgroundColor: COLORS.ButtonTextColor,
		marginBottom: 'auto',
	},
	amountText: {
		fontFamily: FONTS.Inter,
		fontSize: 16,
		color: COLORS.MainTextColor,
	},
});

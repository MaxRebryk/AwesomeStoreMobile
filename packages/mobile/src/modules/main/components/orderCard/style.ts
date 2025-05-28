import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	mainWrapper: {
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.SimpleTextColor,
		padding: 10,
		gap: 10,
		marginBottom: 20,
	},
	mainText: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
	},
	sideText: {
		fontFamily: FONTS.Poppins,
		fontSize: 16,
	},
});

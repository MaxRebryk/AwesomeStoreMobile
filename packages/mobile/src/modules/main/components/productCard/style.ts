import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	item: {
		borderColor: COLORS.SimpleTextColor,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		gap: 10,
		marginBottom: 15,
	},
	firstRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	simpleText: {
		fontFamily: FONTS.Poppins,
		color: COLORS.MainTextColor,
		fontSize: 16,
		letterSpacing: 0,
	},
	boldText: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
		color: COLORS.MainTextColor,
	},
});

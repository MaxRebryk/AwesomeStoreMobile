import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	item: {
		position: 'relative',
		borderColor: COLORS.SimpleTextColor,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		gap: 10,
	},
	firstRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	mainTextContainer: {
		flexDirection: 'row',
		gap: 15,
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
	deleteButton: {
		position: 'absolute',
		right: 10,
		top: '50%',
		transform: [{ translateY: -45 }],
	},
});

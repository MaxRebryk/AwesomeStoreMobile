import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	mainWrapper: {
		gap: 50,
	},
	title: {
		fontFamily: FONTS.Inter,
		textAlign: 'center',
		fontWeight: 500,
		letterSpacing: 0,
		fontSize: 14,
	},
	fieldWrapper: {
		alignItems: 'center',
	},
	codeFieldRoot: { maxWidth: 206, maxHeight: 50, gap: 5 },
	cell: {
		width: 44,
		height: 50,
		lineHeight: 38,
		fontSize: 24,
		borderWidth: 2,
		backgroundColor: COLORS.ButtonTextColor,
		borderColor: COLORS.ButtonTextColor,
		textAlign: 'center',
		borderRadius: 10,
	},
	focusCell: {
		borderColor: COLORS.Background,
	},
});

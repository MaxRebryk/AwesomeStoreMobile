import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	headerWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 44,
		marginTop: 10,
		marginBottom: 20,
		paddingHorizontal: 16,
	},
	title: {
		fontFamily: FONTS.PoppinsBold,
		color: COLORS.MainTextColor,
		fontSize: 24,
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
	},
	leftSection: {
		width: 40,
		alignItems: 'flex-start',
		zIndex: 1,
	},
	rightSection: {
		width: 40,
		alignItems: 'flex-end',
	},
});

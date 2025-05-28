import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	mainWrapper: {
		position: 'relative',
	},
	countBackground: {
		position: 'absolute',
		top: 8,
		right: -8,
		backgroundColor: COLORS.AttentionColor,
		borderRadius: 10,
		width: 19,
		height: 19.79,
		justifyContent: 'center',
		alignItems: 'center',
	},
	countText: {
		fontFamily: FONTS.Poppins,
		color: COLORS.ButtonTextColor,
		fontSize: 8.14,
	},
});

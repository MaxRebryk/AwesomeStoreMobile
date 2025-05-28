import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	mainWrapper: {
		display: 'flex',
		flex: 1,
		gap: 6,
		paddingTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 210,
		backgroundColor: COLORS.Background,
	},
	mainText: {
		fontFamily: FONTS.PoppinsBold,
		color: COLORS.MainTextColor,
		fontSize: 24,
		letterSpacing: 0,
		maxHeight: 44,
	},
	headerWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 44,
		position: 'relative',
	},
	titleContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		alignItems: 'center',
	},
	cartContainer: {
		position: 'absolute',
		right: 0,
	},
	filterButtonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 30,
	},
});

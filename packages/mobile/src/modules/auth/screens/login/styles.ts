import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	mainWrapper: {
		display: 'flex',
		flex: 1,
		gap: 6,
		paddingTop: 50,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		backgroundColor: COLORS.Background,
	},
	logoWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainText: {
		fontFamily: FONTS.Kaushan,
		fontWeight: 400,
		fontSize: 40,
		lineHeight: 100,
		letterSpacing: 0,
	},
	contentWrapper: {
		display: 'flex',
		flex: 1,
		justifyContent: 'space-between',
	},
	passwordInputWrapper: {
		position: 'relative',
		justifyContent: 'center',
	},
	passwordHideButton: {
		position: 'absolute',
		right: 20,
		top: '50%',
		transform: [{ translateY: -12 }],
	},
	footerWrapper: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
	},
	footerButton: {
		width: 361,
		height: 43,
		color: COLORS.ButtonTextColor,
		backgroundColor: COLORS.ButtonActive,
	},
	footerTextWrapper: {
		flexDirection: 'row',
	},
	footerText: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
		lineHeight: 100,
		letterSpacing: 0,
	},
	footerLink: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
		lineHeight: 100,
		letterSpacing: 0,
		color: COLORS.ButtonActive,
	},
});

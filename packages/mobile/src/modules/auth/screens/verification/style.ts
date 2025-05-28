import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	mainWrapper: {
		display: 'flex',
		flex: 1,
		gap: 50,
		paddingTop: 50,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		backgroundColor: COLORS.Background,
		justifyContent: 'space-between',
	},
	mainText: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
		letterSpacing: 0,
		textAlign: 'center',
		maxHeight: 50,
		marginBottom: 50,
	},
});

import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles/fonts';

export default StyleSheet.create({
	mainWrapper: {},
	contentWrapper: {
		alignItems: 'center',
		gap: 20,
		marginBottom: '100%',
	},
	mainText: {
		fontFamily: FONTS.Poppins,
		fontWeight: 400,
		fontSize: 16,
	},
});

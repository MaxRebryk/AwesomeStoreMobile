import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderBottomColor: COLORS.SimpleTextColor,
		marginBottom: 20,
		maxHeight: 72,
		maxWidth: 361,
		position: 'relative',
	},

	productInfoWrapper: {
		flexDirection: 'row',
		gap: 10,
	},
	productInfoSemiWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	name: {
		fontSize: 18,
		marginBottom: 4,
	},
	mainText: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 16,
	},
	SemiText: {
		fontFamily: FONTS.Poppins,
		fontSize: 16,
	},
	deleteButton: {
		position: 'absolute',
		right: 20,
		top: '50%',
	},
});

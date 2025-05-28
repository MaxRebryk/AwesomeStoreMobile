import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	mainWrapper: {
		display: 'flex',
		flex: 1,
		gap: 6,
		marginHorizontal: 15,
		backgroundColor: COLORS.Background,
	},
	mainText: {
		fontFamily: FONTS.PoppinsSemiBold,
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 30,
	},
});

import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		backgroundColor: COLORS.Background,
		marginHorizontal: 15,
	},
	settingsButtonsWrapper: {
		marginTop: 20,
	},
	buttons: {
		padding: 15,
	},
	simpleButtonsText: {
		fontFamily: FONTS.Poppins,
		fontSize: 16,
		color: COLORS.MainTextColor,
	},
	attentionButtonsText: {
		fontFamily: FONTS.Poppins,
		fontSize: 16,
		color: COLORS.AttentionColor,
	},
});

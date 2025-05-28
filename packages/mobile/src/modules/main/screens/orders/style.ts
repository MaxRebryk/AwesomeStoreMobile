import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		backgroundColor: COLORS.Background,
	},
	contentContainer: {
		flex: 1,
		marginHorizontal: 15,
	},
	filterWrapper: {
		gap: 20,
	},
	filterHeaderWrapper: {
		paddingLeft: 10,
	},
	mainText: {
		fontFamily: FONTS.PoppinsSemiBold,
		fontSize: 16,
		color: COLORS.MainTextColor,
	},
	funcFilterWrapper: {
		flexDirection: 'row',
		gap: 60,
		marginBottom: 20,
		padding: 10,
	},
	funcFilterButtons: {},
	filterText: {
		color: COLORS.ParamsColor,
	},
	ordersListContainer: {
		paddingBottom: 190,
	},
});

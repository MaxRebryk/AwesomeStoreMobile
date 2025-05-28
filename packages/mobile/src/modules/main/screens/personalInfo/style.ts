import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	mainWrapper: {
		flex: 1,
		backgroundColor: COLORS.Background,
		marginHorizontal: 15,
	},
	inputWrapper: {
		marginBottom: 50,
	},
	deleteButton: {
		marginBottom: 'auto',
	},
	deleteText: {
		textAlign: 'center',
		fontFamily: FONTS.PoppinsSemiBold,
		color: COLORS.AttentionColor,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	modalContent: {
		backgroundColor: COLORS.ButtonTextColor,
		borderRadius: 10,
		padding: 20,
		width: '80%',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	modalTitle: {
		fontFamily: FONTS.PoppinsBold,
		fontSize: 18,
		marginBottom: 10,
		color: COLORS.MainTextColor,
	},
	modalText: {
		fontFamily: FONTS.Poppins,
		fontSize: 14,
		textAlign: 'center',
		marginBottom: 20,
		color: COLORS.MainTextColor,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	modalButton: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		minWidth: 100,
		alignItems: 'center',
	},
	cancelButton: {
		backgroundColor: COLORS.AttentionColor,
	},
	deleteModalButton: {
		backgroundColor: COLORS.ButtonActive,
	},
	cancelButtonText: {
		color: COLORS.ButtonTextColor,
		fontFamily: FONTS.PoppinsSemiBold,
	},
	deleteButtonText: {
		color: COLORS.ButtonTextColor,
		fontFamily: FONTS.PoppinsSemiBold,
	},
});

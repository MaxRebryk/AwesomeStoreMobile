import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		paddingBottom: 20,
		marginBottom: 10,
	},
	input: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 12,
		fontSize: 14,
		backgroundColor: COLORS.ButtonTextColor,
		borderWidth: 1,
		borderColor: COLORS.Background,
		borderRadius: 10,
	},
	label: {
		marginBottom: 6,
		fontSize: 14,
		fontWeight: 500,
		color: COLORS.SimpleTextColor,
	},
	focused: {
		borderWidth: 1,
	},
	wrong: {
		borderWidth: 1,
		borderColor: COLORS.AttentionColor,
	},
	correct: {
		borderWidth: 1,
	},
	disabled: {
		backgroundColor: '#F7F9FC',
		opacity: 0.7,
	},
});

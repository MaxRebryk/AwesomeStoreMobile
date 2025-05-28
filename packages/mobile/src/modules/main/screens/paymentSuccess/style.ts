import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';

export default StyleSheet.create({
	mainWrapper: {
		flex: 1,
		backgroundColor: COLORS.Background,
		justifyContent: 'center',
		alignItems: 'center',
	},
	empty: {
		marginBottom: 'auto',
	},
	contentWrapper: {
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingHorizontal: 20,
		gap: 20,
	},
});

import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';

export default StyleSheet.create({
	mainWrapper: {
		display: 'flex',
		flex: 1,
		gap: 6,
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
		paddingBottom: 15,
		backgroundColor: COLORS.Background,
	},
	contentWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 'auto',
		marginTop: '50%',
	},
});

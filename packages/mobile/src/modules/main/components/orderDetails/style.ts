import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles/colors';
import { FONTS } from 'src/shared/styles/fonts';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	totalText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 50,
		textAlign: 'center',
	},
	listContainer: {
		flex: 1,
	},
	listContent: {
		gap: 12,
	},
});

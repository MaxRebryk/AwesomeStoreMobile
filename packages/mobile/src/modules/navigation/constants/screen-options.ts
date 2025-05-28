import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { COLORS } from 'src/shared/styles/colors';

export const SCREEN_OPTIONS = {
	headerShown: false,
};

export const TAB_OPTIONS: BottomTabNavigationOptions = {
	headerShown: false,
	tabBarStyle: {
		backgroundColor: '#fff',
		height: 100,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		position: 'absolute' as const,
	},
	tabBarActiveTintColor: COLORS.ButtonActive,
	tabBarInactiveTintColor: COLORS.SimpleTextColor,
	tabBarLabelStyle: {
		fontSize: 12,
		marginBottom: 8,
	},
	tabBarIconStyle: {
		marginTop: 8,
	},
};

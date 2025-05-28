import { Text, View } from 'react-native';
import CheckMark from '../../../../assets/icons/checkmark-circle.svg';

import styles from './style';
import Button from '../button/button.component';

interface ISuccessProps {
	text: string;
	buttonTitle: string;
	handlePress: () => void;
}

const Success = ({ text, buttonTitle, handlePress }: ISuccessProps) => {
	return (
		<View style={styles.mainWrapper}>
			<View style={styles.contentWrapper}>
				<CheckMark></CheckMark>
				<Text>{text}</Text>
			</View>
			<View>
				<Button
					title={buttonTitle}
					isActive={true}
					onPress={handlePress}
				/>
			</View>
		</View>
	);
};
export default Success;

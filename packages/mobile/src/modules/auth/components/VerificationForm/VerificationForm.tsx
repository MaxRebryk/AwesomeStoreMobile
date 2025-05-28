import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles from './style';

interface IVerificationFormPros {
	onInputChange: (text: string) => void;
}

const CELL_COUNT = 4;

export default function VerificationForm({
	onInputChange,
}: IVerificationFormPros) {
	const [value, setValue] = useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const handleChange = (text: string) => {
		setValue(text);
		onInputChange(text);
	};

	return (
		<View style={styles.mainWrapper}>
			<Text style={styles.title}>
				Please type the code from the email
			</Text>
			<View style={styles.fieldWrapper}>
				<CodeField
					ref={ref}
					{...props}
					value={value}
					onChangeText={handleChange}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>
			</View>
		</View>
	);
}

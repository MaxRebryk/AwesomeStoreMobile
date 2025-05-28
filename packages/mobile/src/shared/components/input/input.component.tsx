import * as React from 'react';
import {
	StyleProp,
	Text,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import {
	Control,
	FieldPath,
	FieldPathValue,
	FieldValues,
	RegisterOptions,
	useController,
} from 'react-hook-form';

import { styles } from './input.styles';
import { InputError } from '../../input-error';

type InputProps<
	T extends FieldValues = FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
> = {
	name: N;
	control: Control<T>;
	defaultValue: FieldPathValue<T, N>;
	isSecure?: boolean;
	placeholder?: string;
	disabled?: boolean;
	rules?:
		| Omit<
				RegisterOptions<T, N>,
				'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
		  >
		| undefined;
	label?: string;
	extraInputContainerStyles?: StyleProp<ViewStyle>;
	extraErrorStyles?: StyleProp<TextStyle>;
	textContentType?:
		| 'none'
		| 'URL'
		| 'addressCity'
		| 'addressCityAndState'
		| 'addressState'
		| 'creditCardNumber'
		| 'emailAddress'
		| 'familyName'
		| 'fullStreetAddress'
		| 'givenName'
		| 'jobTitle'
		| 'location'
		| 'middleName'
		| 'name'
		| 'namePrefix'
		| 'nameSuffix'
		| 'nickname'
		| 'organizationName'
		| 'postalCode'
		| 'streetAddressLine1'
		| 'streetAddressLine2'
		| 'sublocality'
		| 'telephoneNumber'
		| 'username'
		| 'password'
		| 'newPassword'
		| 'oneTimeCode';
	autoComplete?:
		| 'off'
		| 'username'
		| 'password'
		| 'email'
		| 'name'
		| 'tel'
		| 'street-address'
		| 'postal-code'
		| 'cc-number'
		| 'cc-csc'
		| 'cc-exp'
		| 'cc-exp-month'
		| 'cc-exp-year';
};

export function Input<
	T extends FieldValues,
	N extends FieldPath<T> = FieldPath<T>,
>({
	control,
	name,
	rules,
	defaultValue,
	label,
	isSecure,
	placeholder,
	disabled,
	extraInputContainerStyles,
	extraErrorStyles = {},
	textContentType,
	autoComplete,
}: InputProps<T, N>) {
	const [isFocused, setIsFocused] = React.useState(false);

	const inputRef = React.createRef<TextInput>();

	const {
		field: { value, onBlur, onChange },
		fieldState: { error },
	} = useController({
		control,
		defaultValue,
		name,
		rules,
	});

	const handleFocus = () => {
		if (inputRef.current?.isFocused) {
			setIsFocused(true);
			return;
		}
		setIsFocused(false);
	};

	const handleBlur = () => {
		onBlur();
		setIsFocused(false);
	};

	return (
		<View style={[styles.container, extraInputContainerStyles]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<TextInput
				value={value}
				onChangeText={onChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
				secureTextEntry={isSecure}
				placeholder={placeholder}
				editable={!disabled}
				style={[
					styles.input,
					value && !error && styles.correct,
					isFocused && styles.focused,
					error && styles.wrong,
					disabled && styles.disabled,
				]}
				autoCapitalize="none"
				ref={inputRef}
				textContentType={textContentType}
				autoComplete={autoComplete}
			/>

			<InputError<T>
				control={control}
				field={name}
				extraErrorStyles={extraErrorStyles}
			/>
		</View>
	);
}

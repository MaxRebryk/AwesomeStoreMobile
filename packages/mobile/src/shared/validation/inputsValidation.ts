import * as yup from 'yup';

export const loginSchema = yup.object({
	email: yup
		.string()
		.email('Некоректний email')
		.required('Це поле обовʼязкове'),
	password: yup.string().required('Це поле обовʼязкове').min(5),
});

export const registerSchema = yup.object({
	email: yup
		.string()
		.email('Некоректний email')
		.required('Це поле обовʼязкове'),

	name: yup
		.string()
		.matches(
			/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s]+$/,
			'Імʼя повинно містити лише літери',
		)
		.required('Це поле обовʼязкове'),

	phoneNumber: yup
		.string()
		.matches(/^\+?[1-9]\d{1,14}$/, 'Некоректний номер телефону')
		.required('Це поле обовʼязкове'),

	shippingAddress: yup.string().required('Це поле обовʼязкове'),

	password: yup
		.string()
		.min(6, 'Пароль має бути не менше 6 символів')
		.required('Це поле обовʼязкове'),

	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Паролі не співпадають')
		.required('Це поле обовʼязкове'),
});

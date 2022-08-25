import { useState } from 'react';
import { validateUser } from '../users/userValidation';

export const useFormValues = () => {
	const [user, setUser] = useState({
		value: '',
		error: undefined
	});

	const setName = name => {
		const error = validateUser(name);

		setUser({
			...user,
			value: name
		});

		if (error) {
			setNameError(error);
		}
	};

	const setNameError = newError => {
		setUser(prevFormValues => ({
			...prevFormValues,
			error: newError
		}));
	};

	return { user, setName, setNameError };
};

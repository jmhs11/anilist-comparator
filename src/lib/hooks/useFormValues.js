import { useEffect, useState } from 'react';
import { validateUser } from '../users/userValidation';

export const useFormValues = searchOption => {
	const [user, setUser] = useState({
		value: '',
		loading: false,
		error: undefined
	});

	const setName = name => {
		const error = validateUser(name);

		if (error) {
			// REFACTOR PORQUE CREO QUE NO SIRVE
			setNameError(error);
		}

		setUser({
			value: name,
			error,
			loading: !error
		});
	};

	const setNameError = error => {
		setUser({
			...user,
			loading: false,
			error
		});
	};

	useEffect(() => {
		if (user.loading) {
			const timeout = setTimeout(() => {
				searchOption({
					variables: {
						search: user.value
					}
				});
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, [user, searchOption]);

	return { user, setName };
};

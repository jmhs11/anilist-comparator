import { useState } from 'react';

const useAniUsers = () => {
	const [aniUsers, setAniUsers] = useState({
		user1: {
			mediaList: {
				data: [], // Array de listas de media
				loading: false
			},
			user: {
				data: '', // Usuario a buscar
				loading: false,
				error: undefined
			}
		},
		user2: {
			mediaList: {
				data: [], // Array de listas de media
				loading: false
			},
			user: {
				data: '', // Usuario a buscar
				loading: false,
				error: undefined
			}
		}
	});

	const setMediaList = (key, { data, loading }) => {
		setAniUsers(prev => {
			return {
				...prev,
				[key]: {
					...prev[key],
					mediaList: {
						data: data || prev[key].mediaList.data,
						loading: loading ?? prev[key].mediaList.loading
					}
				}
			};
		});
	};

	const setUser = (key, { data, loading, error }) => {
		setAniUsers(prev => {
			return {
				...prev,
				[key]: {
					...prev[key],
					user: {
						data: data ?? prev[key].user.data,
						loading: loading ?? prev[key].user.loading,
						error
					}
				}
			};
		});
	};

	return {
		aniUsers,
		setMediaList,
		setUser
	};
};

export default useAniUsers;

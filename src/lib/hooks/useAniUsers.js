import { useReducer } from 'react';

export const TYPE = {
	UPDATE_USER_1: 'UPDATE_USER_1',
	UPDATE_USER_2: 'UPDATE_USER_2',
	UPDATE_MEDIALIST_1: 'UPDATE_MEDIALIST_1',
	UPDATE_MEDIALIST_2: 'UPDATE_MEDIALIST_2'
};

const reducer = (state, action) => {
	console.log({ state, action });
	switch (action.type) {
		case TYPE.UPDATE_USER_1:
			return {
				...state,
				user1: { ...state.user1, user: { ...state.user1.user, ...action.value } }
			};

		case TYPE.UPDATE_USER_2:
			return {
				...state,
				user2: { ...state.user2, user: { ...state.user2.user, ...action.value } }
			};

		case TYPE.UPDATE_MEDIALIST_1:
			return {
				...state,
				user1: { ...state.user1, mediaList: { ...state.user1.mediaList, ...action.value } }
			};

		case TYPE.UPDATE_MEDIALIST_2:
			return {
				...state,
				user2: { ...state.user2, mediaList: { ...state.user2.mediaList, ...action.value } }
			};

		default:
			throw new Error('Invalid action');
	}
};

const useAniUsers = () => {
	const [aniUsers, dispatchAniUsers] = useReducer(reducer, {
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

	// const [aniUsers, setAniUsers] = useState({
	// 	user1: {
	// 		mediaList: {
	// 			data: [], // Array de listas de media
	// 			loading: false
	// 		},
	// 		user: {
	// 			data: '', // Usuario a buscar
	// 			loading: false,
	// 			error: undefined
	// 		}
	// 	},
	// 	user2: {
	// 		mediaList: {
	// 			data: [], // Array de listas de media
	// 			loading: false
	// 		},
	// 		user: {
	// 			data: '', // Usuario a buscar
	// 			loading: false,
	// 			error: undefined
	// 		}
	// 	}
	// });

	// const setMediaList = (key, { data, loading }) => {
	// 	setAniUsers(prev => {
	// 		return {
	// 			...prev,
	// 			[key]: {
	// 				...prev[key],
	// 				mediaList: {
	// 					data: data || prev[key].mediaList.data,
	// 					loading: loading ?? prev[key].mediaList.loading
	// 				}
	// 			}
	// 		};
	// 	});
	// };

	// const setUser = (key, { data, loading, error }) => {
	// 	setAniUsers(prev => {
	// 		return {
	// 			...prev,
	// 			[key]: {
	// 				...prev[key],
	// 				user: {
	// 					data: data ?? prev[key].user.data,
	// 					loading: loading ?? prev[key].user.loading,
	// 					error
	// 				}
	// 			}
	// 		};
	// 	});
	// };

	return {
		aniUsers,
		dispatchAniUsers
	};
};

export default useAniUsers;

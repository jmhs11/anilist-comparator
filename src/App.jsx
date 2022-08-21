import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import AnimeList from './components/AnimeList';
import InputSearch from './components/forms/InputSearch';
import { validateUser } from './components/lib/users/userValidation';
import { SEARCH_USERS_LIKE } from './queries/searchUser.js';

const prettyJSON = json => <pre>{JSON.stringify(json, null, 2)}</pre>;

const App = () => {
	const [searchUsers, usersSearched] = useLazyQuery(SEARCH_USERS_LIKE);
	const { user: user1, setName } = useFormValues(searchUsers);
	const [searchUsers2, usersSearched2] = useLazyQuery(SEARCH_USERS_LIKE);
	const { user: user2, setName: setName2 } = useFormValues(searchUsers2);

	// const [searchUser1AniList, user1AniList] = useLazyQuery(SEARCH_USER_ANILIST);
	// const { userAniList, searchAnime } = useSearch(
	// 	user1AniList,
	// 	searchUser1AniList
	// );

	return (
		<div className='p-4'>
			<header className='my-4'>
				<h1 className='text-center'>ANILIST COMPARATOR</h1>
			</header>
			<main className='grid grid-cols-2 gap-4'>
				<section className='p-4'>
					<InputSearch
						placeholder='Introduce usuario a comparar'
						className='mb-4'
						value={user1.value}
						error={user1.error}
						handlerChange={setName}
						// handlerClick={searchAnime}
						autocompleteItems={usersSearched.data}
					/>
					{user1 ? prettyJSON(user1) : null}
					<AnimeList user={user1.value} />
				</section>
				<section className='p-4'>
					<InputSearch
						placeholder='Introduce usuario a comparar'
						className='mb-4'
						value={user2.value}
						error={user2.error}
						handlerChange={setName2}
						handlerClick={() => {}}
						autocompleteItems={usersSearched2.data}
					/>
					{user2 ? prettyJSON(user2) : null}
					<AnimeList animes={[]} />
				</section>
			</main>
		</div>
	);
};

const useFormValues = searchOption => {
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

// const useSearch = (userAniListHook, searchUserAniList) => {
// 	const [userAniList, setUserAniList] = useState({
// 		data: undefined,
// 		error: undefined,
// 		loading: false
// 	});

// 	const searchAnime = user => {
// 		searchUserAniList({
// 			variables: {
// 				search: user
// 			}
// 		});

// 		setUserAniList({
// 			...userAniList,
// 			data: userAniListHook.data
// 		});
// 	};

// 	return { userAniList, searchAnime };
// };

export default App;

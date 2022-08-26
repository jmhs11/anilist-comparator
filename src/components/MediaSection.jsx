import { useQuery } from '@apollo/client';
import { useCallback, useState } from 'react';
import { SEARCH_USERS_LIKE } from '../queries/searchUser';
import InputSearch from './forms/InputSearch';
import MediaList from './MediaList';

const MediaSection = ({ user, userData, setMediaList, setUser, fillMediaList, filters }) => {
	const [autocompleteItems, setAutocompleteItems] = useState([]);

	const { refetch: searchUsers } = useQuery(SEARCH_USERS_LIKE, { skip: true });

	const fillAutocompleteItems = search => {
		if (search) {
			searchUsers({ search })
				.then(resultsObj => resultsObj.data)
				.then(data => data.users)
				.then(users => {
					setAutocompleteItems(users.results);
					setUser(user, { loading: false });
				});
		} else {
			setAutocompleteItems([]);
			setUser(user, { loading: false });
			setMediaList(user, { data: [], loading: false });
		}
	};

	const debounce = func => {
		let timer;
		return function (...args) {
			const context = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func.apply(context, args);
			}, 500);
		};
	};

	const optimizedFn = useCallback(debounce(fillAutocompleteItems), []);

	return (
		<section className='p-4 pt-0 overflow-hidden'>
			<InputSearch
				placeholder='Introduce usuario a comparar'
				value={userData.user.data}
				error={userData.user.error}
				loading={userData.user.loading}
				onChange={ev => {
					setUser(user, { data: ev.target.value, loading: true });
					optimizedFn(ev.target.value);
				}}
				handlerClick={ev => {
					setUser(user, { data: ev.target.textContent });
					setMediaList(user, { loading: true });
					fillMediaList(user, ev.target.textContent);
				}}
				autocompleteItems={autocompleteItems}
			/>
			<div
				className={`h-full pb-14 md:pb-0 ${
					userData.mediaList.loading && 'grid place-content-center'
				}`}
			>
				{userData.mediaList ? (
					<MediaList loading={userData.mediaList.loading} mediaList={userData.mediaList.data} />
				) : null}
			</div>
		</section>
	);
};

export default MediaSection;

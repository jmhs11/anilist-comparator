import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { MEDIA_LIST_STATUSES } from '../constants/mediaListStatuses';
import { MEDIA_TYPE } from '../constants/mediaTypes';
import { SEARCH_USER_MEDIALIST } from '../queries/searchMediaList';
import { SEARCH_USERS_LIKE } from '../queries/searchUser';
import InputSearch from './forms/InputSearch';
import MediaList from './MediaList';

const MediaSection = ({ filters }) => {
	const [user1, setUser1] = useState('');
	const [autocompleteItems, setAutocompleteItems] = useState([]);
	const [mediaList, setMediaList] = useState({
		loading: false,
		data: { MediaListCollection: { lists: [] } }
	});

	const { refetch: searchUsers } = useQuery(SEARCH_USERS_LIKE, { skip: true });
	const { refetch: searchMediaList } = useQuery(SEARCH_USER_MEDIALIST, { skip: true });

	const [loading, setLoading] = useState(false);
	const [mediaListLoading, setMediaListLoading] = useState(false);

	const fillAutocompleteItems = search => {
		if (search) {
			searchUsers({ search })
				.then(resultsObj => resultsObj.data)
				.then(data => data.users)
				.then(users => {
					setAutocompleteItems(users.results);
					setLoading(false);
				});
		} else {
			setAutocompleteItems([]);
			setLoading(false);
			setMediaList({});
		}
	};

	const fillMediaList = search => {
		searchMediaList({
			userName: search,
			type: filters.mediaType || MEDIA_TYPE.ANIME,
			status: filters.list || MEDIA_LIST_STATUSES.ALL
		}).then(mediaList => {
			setMediaList(mediaList);
			setMediaListLoading(false);
		});
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

	useEffect(() => {
		console.log('Render of List with Updated Filters', filters);
	}, [filters]);

	const optimizedFn = useCallback(debounce(fillAutocompleteItems), []);

	return (
		<section className='p-4 pt-0 overflow-hidden'>
			<InputSearch
				placeholder='Introduce usuario a comparar'
				value={user1}
				error={''}
				loading={loading}
				onChange={ev => {
					setUser1(ev.target.value);
					setLoading(true);
					optimizedFn(ev.target.value);
				}}
				handlerClick={ev => {
					setUser1(ev.target.textContent);
					setMediaListLoading(true);
					fillMediaList(ev.target.textContent);
				}}
				autocompleteItems={autocompleteItems}
			/>
			<div className={`h-full pb-14 md:pb-0 ${mediaListLoading && 'grid place-content-center'}`}>
				{mediaList ? <MediaList loading={mediaListLoading} mediaList={mediaList} /> : null}
			</div>
		</section>
	);
};

export default MediaSection;

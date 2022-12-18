import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Split from 'react-split';
import Filters from './components/Filters';
import Header from './components/Header';
import MediaSection from './components/MediaSection';
import { MEDIA_LIST_STATUSES } from './constants/mediaListStatuses';
import { MEDIA_TYPE } from './constants/mediaTypes';
import useAniUsers, { TYPE } from './lib/hooks/useAniUsers';
import useFilters from './lib/hooks/useFilters';
import { SEARCH_USER_MEDIALIST } from './queries/searchMediaList';

const App = () => {
	const { aniUsers, dispatchAniUsers } = useAniUsers();
	const { filters, dispatchFilters } = useFilters();

	const [appliedFilters, setAppliedFilters] = useState(false);
	const [split, setSplit] = useState(window.innerWidth < 768);

	useEffect(() => {
		window.addEventListener('resize', () => setSplit(window.innerWidth < 768));
	}, []);

	const { refetch: searchMediaList } = useQuery(SEARCH_USER_MEDIALIST, { skip: true });

	const fillMediaList = (userKey, search) => {
		if (!filters.distinct) {
			searchMediaList({
				userName: search,
				type: filters.mediaType || MEDIA_TYPE.ANIME,
				status: filters.list || MEDIA_LIST_STATUSES.ALL,
				sort: filters.sort || ['SCORE']
			}).then(mediaList => {
				const mediaListCustom = {
					data: mediaList.data.MediaListCollection.lists,
					loading: mediaList.loading
				};

				dispatchAniUsers({
					type: userKey === 'user1' ? TYPE.UPDATE_MEDIALIST_1 : TYPE.UPDATE_MEDIALIST_2,
					value: mediaListCustom
				});
			});
		}
	};

	const applyFilters = filters => {
		setAppliedFilters(true);
		if (aniUsers.user1.user.data) fillMediaList('user1', aniUsers.user1.user.data);
		if (aniUsers.user2.user.data) fillMediaList('user2', aniUsers.user2.user.data);
		console.log(filters);
	};

	useEffect(() => {
		if (filters.distinct && appliedFilters) {
			const mediaIds = {
				user1: [],
				user2: []
			};
			let filteredData = {
				user1: [],
				user2: []
			};

			Object.entries(aniUsers).forEach(([userKey, state]) => {
				mediaIds[userKey] = state.mediaList.data.flatMap(list =>
					list.entries.map(entry => entry.mediaId)
				);
				filteredData[userKey] = state.mediaList.data;
			});

			const distinct = mediaIds.user1.filter(id => mediaIds.user2.includes(id));
			console.log(distinct);

			filteredData = Object.entries(filteredData).map(([userkey, data]) => ({
				[userkey]: data.map(list => ({
					...list,
					entries: list.entries.filter(entry => !distinct.includes(entry.mediaId))
				}))
			}));

			// Object.entries(aniUsers).forEach(([userKey, state]) => {
			// 	mediaIds[userKey] = state.mediaList.data.flatMap(list =>
			// 		list.entries.map(entry => entry.mediaId)
			// 	);

			// 	filteredData[userKey] = state.mediaList.data;
			// });

			console.log(filteredData);

			// const list2Ids = userList.map(list => list.entries.map(entry => entry.mediaId)).flat();

			dispatchAniUsers({ type: TYPE.UPDATE_MEDIALIST_1, value: { data: filteredData[0].user1 } });
			dispatchAniUsers({ type: TYPE.UPDATE_MEDIALIST_2, value: { data: filteredData[1].user2 } });
			setAppliedFilters(false);
		}
	}, [filters.distinct, appliedFilters]);

	return (
		<>
			<Header
				slot={
					<Filters
						filters={filters}
						dispatchFilters={dispatchFilters}
						applyFilters={applyFilters}
					/>
				}
			/>

			{split ? (
				<Split className='md:hidden' direction='vertical' style={{ height: 'calc(100dvh - 6rem)' }}>
					<MediaSection
						user='user1'
						userData={aniUsers.user1}
						setMediaList={data => dispatchAniUsers({ type: TYPE.UPDATE_MEDIALIST_1, value: data })}
						setUser={data => dispatchAniUsers({ type: TYPE.UPDATE_USER_1, value: data })}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
					<MediaSection
						user='user2'
						userData={aniUsers.user2}
						setMediaList={data => dispatchAniUsers({ type: TYPE.UPDATE_MEDIALIST_2, value: data })}
						setUser={data => dispatchAniUsers({ type: TYPE.UPDATE_USER_2, value: data })}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
				</Split>
			) : (
				<main className='hidden md:grid md:grid-cols-2 md:gap-4'>
					<MediaSection
						user='user1'
						userData={aniUsers.user1}
						setMediaList={data => dispatchAniUsers({ type: TYPE.UPDATE_MEDIALIST_1, value: data })}
						setUser={data => dispatchAniUsers({ type: TYPE.UPDATE_USER_1, value: data })}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
					<MediaSection
						user='user2'
						userData={aniUsers.user2}
						setMediaList={data => dispatchAniUsers({ type: TYPE.UPDATE_MEDIALIST_2, value: data })}
						setUser={data => dispatchAniUsers({ type: TYPE.UPDATE_USER_2, value: data })}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
				</main>
			)}
		</>
	);
};

export default App;

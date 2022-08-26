import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Split from 'react-split';
import Filters from './components/Filters';
import Header from './components/Header';
import MediaSection from './components/MediaSection';
import { MEDIA_LIST_STATUSES } from './constants/mediaListStatuses';
import { MEDIA_TYPE } from './constants/mediaTypes';
import useAniUsers from './lib/hooks/useAniUsers';
import useFilters from './lib/hooks/useFilters';
import { SEARCH_USER_MEDIALIST } from './queries/searchMediaList';

const App = () => {
	const { aniUsers, setMediaList, setUser } = useAniUsers();
	const { filters, ...setFiltersFunctions } = useFilters();

	const [split, setSplit] = useState(window.innerWidth <= 768);

	useEffect(() => {
		window.addEventListener('resize', () => setSplit(window.innerWidth <= 768));
	}, []);

	const { refetch: searchMediaList } = useQuery(SEARCH_USER_MEDIALIST, { skip: true });

	const fillMediaList = (userKey, search) => {
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
			setMediaList(userKey, mediaListCustom);
		});
	};

	const applyFilters = filters => {
		if (aniUsers.user1.user.data) fillMediaList('user1', aniUsers.user1.user.data);
		if (aniUsers.user2.user.data) fillMediaList('user2', aniUsers.user2.user.data);
		console.log(filters);
	};

	return (
		<>
			<Header
				slot={<Filters filters={filters} {...setFiltersFunctions} applyFilters={applyFilters} />}
			/>

			{split ? (
				<Split className='md:hidden' direction='vertical' style={{ height: 'calc(100vh - 5rem)' }}>
					<MediaSection
						user='user1'
						userData={aniUsers.user1}
						setMediaList={setMediaList}
						setUser={setUser}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
					<MediaSection
						user='user2'
						userData={aniUsers.user2}
						setMediaList={setMediaList}
						setUser={setUser}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
				</Split>
			) : (
				<main className='hidden md:grid md:grid-cols-2 md:gap-4'>
					<MediaSection
						user='user1'
						userData={aniUsers.user1}
						setMediaList={setMediaList}
						setUser={setUser}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
					<MediaSection
						user='user2'
						userData={aniUsers.user2}
						setMediaList={setMediaList}
						setUser={setUser}
						fillMediaList={fillMediaList}
						filters={filters}
					/>
				</main>
			)}
		</>
	);
};

export default App;

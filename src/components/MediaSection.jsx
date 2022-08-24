import { useLazyQuery } from '@apollo/client';
import { MEDIA_TYPE } from '../constants/mediaTypes';
import { useFormValues } from '../lib/hooks/useFormValues';
import { SEARCH_USER_MEDIALIST } from '../queries/searchMediaList';
import { SEARCH_USERS_LIKE } from '../queries/searchUser';
import InputSearch from './forms/InputSearch';
import MediaList from './MediaList';

const MediaSection = ({ filters }) => {
	const [searchUsers, usersSearched] = useLazyQuery(SEARCH_USERS_LIKE);
	const { user, setName } = useFormValues(searchUsers);

	const [searchMediaList, mediaList] = useLazyQuery(SEARCH_USER_MEDIALIST);

	const setList = () => {
		if (user.loading && searchMediaList) {
			console.log(filters);
			searchMediaList({
				variables: {
					userName: user.value,
					type: filters.mediaType || MEDIA_TYPE.ANIME
				}
			});
		}
	};

	return (
		<section className='p-4 pt-0 overflow-hidden'>
			<InputSearch
				placeholder='Introduce usuario a comparar'
				className=''
				value={user.value}
				error={user.error}
				onChange={ev => setName(ev.target.value)}
				handlerClick={ev => {
					setName(ev.target.textContent);
					setList();
				}}
				autocompleteItems={usersSearched.data}
			/>
			<div className='h-full pb-14 md:pb-0'>
				{' '}
				{mediaList ? <MediaList mediaList={mediaList} /> : null}
			</div>
		</section>
	);
};

export default MediaSection;

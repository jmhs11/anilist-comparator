import { useLazyQuery } from '@apollo/client';
import { useFormValues } from '../lib/hooks/useFormValues';
import { SEARCH_USER_MEDIALIST } from '../queries/searchMediaList';
import { SEARCH_USERS_LIKE } from '../queries/searchUser';
import InputSearch from './forms/InputSearch';
import MediaList from './MediaList';

const MediaSection = () => {
	const [searchUsers, usersSearched] = useLazyQuery(SEARCH_USERS_LIKE);
	const { user, setName } = useFormValues(searchUsers);

	const [searchMediaList, mediaList] = useLazyQuery(SEARCH_USER_MEDIALIST);

	const setList = type => {
		if (user.loading && searchMediaList) {
			searchMediaList({
				variables: {
					userName: user.value,
					type
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
				handlerChange={setName}
				handlerClick={{ setName, setList }}
				autocompleteItems={usersSearched.data}
			/>
			{mediaList ? <MediaList mediaList={mediaList} /> : null}
		</section>
	);
};

export default MediaSection;

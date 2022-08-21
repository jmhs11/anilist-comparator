import { useQuery } from '@apollo/client';
import { SEARCH_USER_ANILIST } from '../queries/searchAniList';
import { MEDIA_TYPE } from './constants/mediaTypes';

const AnimeList = ({ user }) => {
	const { data } = useQuery(SEARCH_USER_ANILIST, {
		variables: {
			userName: user,
			type: MEDIA_TYPE.ANIME
		}
	});

	return (
		<>
			{prettyJSON(data)}
			{/* {animes && animes.length ? (
				animes.map(anime => <>{anime.title}</>)
			) : (
				<p>No existe ningun Anime para este usuario</p>
			)} */}
		</>
	);
};

const prettyJSON = json => <pre>{JSON.stringify(json, null, 2)}</pre>;

export default AnimeList;

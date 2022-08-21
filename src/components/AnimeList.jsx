import { useQuery } from '@apollo/client';
import { SEARCH_USER_ANILIST } from '../queries/searchAniList';
import { MEDIA_TYPE } from './constants/mediaTypes';

const AnimeList = ({ user }) => {
	const { data, loading } = useQuery(SEARCH_USER_ANILIST, {
		variables: {
			userName: user,
			type: MEDIA_TYPE.ANIME
		}
	});

	if (loading) return <div>Loading...</div>;

	if (data) {
		console.log(data.MediaListCollection.lists);
	}

	return (
		<>
			{data &&
			data.MediaListCollection &&
			data.MediaListCollection.lists.length > 0
				? data.MediaListCollection.lists.map(list => (
						<>
							<h3 key={list.name}>{list.name}</h3>
							<div className='flex flex-wrap gap-2'>
								{list.entries.map(entry => (
									<div
										key={entry.id}
										className='shadow-xl w-44 card bg-base-100'
									>
										<figure>
											<img src={entry.media.coverImage.large} alt='Shoes' />
										</figure>
										<div className='card-body'>
											<h2 className='card-title'>
												{entry.media.title.userPreferred}
											</h2>
										</div>
									</div>
								))}
							</div>
						</>
				  ))
				: null}
			{/* {prettyJSON(data)} */}
			{/* {animes && animes.length ? (
				animes.map(anime => <>{anime.title}</>)
			) : (
				<p>No existe ningun Anime para este usuario</p>
			)} */}
		</>
	);
};

// const prettyJSON = json => <pre>{JSON.stringify(json, null, 2)}</pre>;

export default AnimeList;

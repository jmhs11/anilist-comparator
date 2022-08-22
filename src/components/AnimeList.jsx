import { useQuery } from '@apollo/client';
import { SEARCH_USER_ANILIST } from '../queries/searchAniList';
import { MEDIA_TYPE } from './constants/mediaTypes';

const AnimeList = ({ user, type = MEDIA_TYPE.ANIME }) => {
	const { data, loading } = useQuery(SEARCH_USER_ANILIST, {
		variables: {
			userName: user,
			type
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
							<h2
								key={list.name}
								className='text-3xl font-bold text-white
							my-4'
							>
								{list.name}
							</h2>
							<div className='grid grid-cols-[repeat(auto-fill,150px)]  gap-4 place-content-center'>
								{list.entries.map(entry => (
									<a
										key={entry.id}
										className='relative h-56 block group rounded-lg'
										href={`https://anilist.co/${type.toLowerCase()}/${
											entry.media.id
										}`}
										rel='noopener noreferrer'
										target='_blank'
									>
										<img
											className='absolute rounded-lg inset-0 object-cover w-full h-full transition-opacity opacity-100 group-hover:opacity-50'
											src={entry.media.coverImage.large}
											alt={entry.media.title.userPreferred}
										/>
										<div className='relative p-4 h-full'>
											<div className='transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'>
												<h4 className='text-md font-bold text-white'>
													{entry.media.title.userPreferred}
												</h4>
											</div>
										</div>
									</a>
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

const AnimeList = ({ animes }) => {
	return (
		<>
			{prettyJSON(animes)}
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

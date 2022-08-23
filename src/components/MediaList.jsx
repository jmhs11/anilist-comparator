const MediaList = ({ mediaList }) => {
	if (mediaList && mediaList.loading) return <div>Loading...</div>;

	return (
		<div className='overflow-y-auto h-[84%] md:max-h-fit md:h-[78vh] scrollbar'>
			{mediaList &&
			mediaList.data &&
			mediaList.data.MediaListCollection &&
			mediaList.data.MediaListCollection.lists.length > 0
				? mediaList.data.MediaListCollection.lists.map(list => (
						<div key={list.name}>
							<h2 className='my-4 text-3xl font-bold text-white'>{list.name}</h2>
							<div className='grid grid-cols-2 md:grid-cols-[repeat(auto-fill,150px)] gap-2 md:place-content-center'>
								{list.entries.map(entry => (
									<a
										key={entry.id}
										className='relative block h-56 rounded-lg group'
										href={`https://anilist.co/${entry.media.type.toLowerCase()}/${entry.media.id}`}
										rel='noopener noreferrer'
										target='_blank'
									>
										<img
											className='absolute inset-0 object-cover w-full h-full transition-opacity rounded-lg opacity-100 group-hover:opacity-50'
											src={entry.media.coverImage.large}
											alt={entry.media.title.userPreferred}
										/>
										<div className='relative h-full p-4'>
											<div className='transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'>
												<h4 className='font-bold text-white text-md'>
													{entry.media.title.userPreferred}
												</h4>
											</div>
										</div>
									</a>
								))}
							</div>
						</div>
				  ))
				: null}
		</div>
	);
};

export default MediaList;

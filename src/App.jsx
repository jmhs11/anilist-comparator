import { gql, useQuery } from '@apollo/client';

const App = () => {
	// const [data, setData] = useState();
	// const [data1, setData1] = useState();

	// const handleChange = (ev, setData) => {
	// 	setData(data);
	// };

	const query = gql`
		query ($id: Int, $name: String) {
			User(id: $id, name: $name) {
				id
				name
				previousNames {
					name
					updatedAt
				}
				avatar {
					large
				}
				bannerImage
				about
				isFollowing
				isFollower
				donatorTier
				donatorBadge
				createdAt
				moderatorRoles
				isBlocked
				bans
				options {
					profileColor
					restrictMessagesToFollowing
				}
				mediaListOptions {
					scoreFormat
				}
				statistics {
					anime {
						count
						meanScore
						standardDeviation
						minutesWatched
						episodesWatched
						genrePreview: genres(limit: 10, sort: COUNT_DESC) {
							genre
							count
						}
					}
					manga {
						count
						meanScore
						standardDeviation
						chaptersRead
						volumesRead
						genrePreview: genres(limit: 10, sort: COUNT_DESC) {
							genre
							count
						}
					}
				}
				stats {
					activityHistory {
						date
						amount
						level
					}
				}
				favourites {
					anime {
						edges {
							favouriteOrder
							node {
								id
								type
								status(version: 2)
								format
								isAdult
								bannerImage
								title {
									userPreferred
								}
								coverImage {
									large
								}
								startDate {
									year
								}
							}
						}
					}
					manga {
						edges {
							favouriteOrder
							node {
								id
								type
								status(version: 2)
								format
								isAdult
								bannerImage
								title {
									userPreferred
								}
								coverImage {
									large
								}
								startDate {
									year
								}
							}
						}
					}
					characters {
						edges {
							favouriteOrder
							node {
								id
								name {
									userPreferred
								}
								image {
									large
								}
							}
						}
					}
					staff {
						edges {
							favouriteOrder
							node {
								id
								name {
									userPreferred
								}
								image {
									large
								}
							}
						}
					}
					studios {
						edges {
							favouriteOrder
							node {
								id
								name
							}
						}
					}
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(query, {
		variables: { name: 'jmhs11' }
	});
	const {
		loading: loading1,
		error: error1,
		data: data1
	} = useQuery(query, {
		variables: { name: 'ametralla' }
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	if (loading1) return <p>Loading...</p>;
	if (error1) return <p>Error :(</p>;

	console.log(data);
	console.log(data1);
	return (
		<>
			{data.User.name}
			<img src={data.User.avatar.large} />
			{data1.User.name}
			<img src={data1.User.avatar.large} />
		</>
	);

	// setData(result);

	// return (
	// 	<div className='flex'>
	// 		{/* <div className='m-4'>
	// 			<input
	// 				className='input input-primary block mb-4'
	// 				text='Button'
	// 				onChange={ev => handleChange(ev, setData)}
	// 			/>
	// 			{data}
	// 		</div>
	// 		<div className='m-4'>
	// 			<input
	// 				className='input input-primary block mb-4'
	// 				text='Button'
	// 				onChange={ev => {
	// 					const { loading, error, result } = useQuery(query, {
	// 						variables: { name: 'jmhs11' }
	// 					});

	// 					if (loading) return <p>Loading...</p>;
	// 					if (error) return <p>Error :(</p>;

	// 					setData(result);
	// 				}}
	// 			/>
	// 			{data1}
	// 		</div> */}
	// 	</div>
	// );
};

export default App;

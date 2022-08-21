import { gql } from '@apollo/client';

export const SEARCH_USER_ANILIST = gql`
	query ($userId: Int, $userName: String, $type: MediaType) {
		MediaListCollection(userId: $userId, userName: $userName, type: $type) {
			lists {
				name
				isCustomList
				isCompletedList: isSplitCompletedList
				entries {
					...mediaListEntry
				}
			}
			user {
				id
				name
				avatar {
					large
				}
				mediaListOptions {
					scoreFormat
					rowOrder
					animeList {
						sectionOrder
						customLists
						splitCompletedSectionByFormat
						theme
					}
					mangaList {
						sectionOrder
						customLists
						splitCompletedSectionByFormat
						theme
					}
				}
			}
		}
	}

	fragment mediaListEntry on MediaList {
		id
		mediaId
		status
		score
		progress
		progressVolumes
		repeat
		priority
		private
		hiddenFromStatusLists
		customLists
		advancedScores
		notes
		updatedAt
		startedAt {
			year
			month
			day
		}
		completedAt {
			year
			month
			day
		}
		media {
			id
			title {
				userPreferred
				romaji
				english
				native
			}
			coverImage {
				extraLarge
				large
			}
			type
			format
			status(version: 2)
			episodes
			volumes
			chapters
			averageScore
			popularity
			isAdult
			countryOfOrigin
			genres
			bannerImage
			startDate {
				year
				month
				day
			}
		}
	}
`;

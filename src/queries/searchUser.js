import { gql } from '@apollo/client';

export const SEARCH_USERS_LIKE = gql`
	query SEARCH_USERS_LIKE($search: String) {
		users: Page(page: 0, perPage: 5) {
			results: users(search: $search) {
				id
				name
				avatar {
					medium
				}
			}
		}
	}
`;

import { gql } from '@apollo/client';

export const SEARCH_USERS_LIKE = gql`
	query SearchUsersLike($search: String) {
		users: Page(page: 0, perPage: 5) {
			results: users(search: $search) {
				id
				name
			}
		}
	}
`;

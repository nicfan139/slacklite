import { gql } from '@apollo/client';

export const USER_DETAIL_FRAGMENT = gql`
	fragment UserDetail on User {
		id
		firstName
		lastName
		email
		isAdmin
		verified
		createdAt
		updatedAt
	}
`;

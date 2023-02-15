import { gql } from 'graphql-tag';

export const USERS_QUERY = gql`
	query UsersQuery {
		users {
			id
			firstName
			lastName
			email
			isAdmin
			createdAt
			updatedAt
		}
	}
`;

export const USER_QUERY = gql`
	query UserQuery($userId: ID!) {
		user(userId: $userId) {
			id
			firstName
			lastName
			email
			isAdmin
			channels {
				id
				name
				description
			}
			channelsOwned {
				id
				name
				description
			}
			createdAt
			updatedAt
		}
	}
`;

export const CHANNEL_QUERY = gql`
	query ChannelQuery($channelId: ID!) {
		channel(channelId: $channelId) {
			id
			name
			description
			owner {
				id
				firstName
				lastName
				email
			}
			members {
				id
				firstName
				lastName
				email
			}
			messages {
				id
				text
				from {
					firstName
					lastName
				}
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;

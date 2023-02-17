import { gql } from 'graphql-tag';

export const USERS_QUERY = gql`
	query UsersQuery {
		users {
			id
			firstName
			lastName
			email
			createdAt
			updatedAt
		}
	}
`;

export const USERS_ADMIN_QUERY = gql`
	query UsersAdminQuery {
		users: usersAdmin {
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
			preferences {
				id
				colorScheme
				darkModeEnabled
				chatNameDisplay
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
					email
				}
				createdAt
				updatedAt
			}
			createdAt
			updatedAt
		}
	}
`;

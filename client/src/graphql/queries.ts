import { gql } from 'graphql-tag';

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
		}
	}
`;

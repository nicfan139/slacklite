import { gql } from 'graphql-tag';

export const ADD_CHANNEL_MUTATION = gql`
	mutation AddChannelMutation($input: ChannelInput!) {
		channel: addChannel(input: $input) {
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
			createdAt
			updatedAt
		}
	}
`;

export const ADD_MESSAGE_MUTATION = gql`
	mutation AddMessageMutation($input: AddMessageInput!) {
		message: addMessage(input: $input) {
			id
			from {
				id
				firstName
				lastName
				email
			}
			text
			createdAt
			updatedAt
		}
	}
`;

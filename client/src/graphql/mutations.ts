import { gql } from 'graphql-tag';

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

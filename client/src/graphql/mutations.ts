import { gql } from 'graphql-tag';
import { USER_DETAIL_FRAGMENT } from './fragments';

export const UPDATE_USER_MUTATION = gql`
	mutation UpdateUserMutation($userId: ID!, $input: UpdateUserInput!) {
		user: updateUser(userId: $userId, input: $input) {
			...UserDetail
		}
	}
	${USER_DETAIL_FRAGMENT}
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
	mutation UpdateUserPasswordMutation($input: UpdatePasswordInput!) {
		user: updateUserPassword(input: $input) {
			...UserDetail
		}
	}
	${USER_DETAIL_FRAGMENT}
`;

export const UPDATE_PREFERENCE_MUTATION = gql`
	mutation UpdatePreferenceMutation($preferenceId: ID!, $input: UpdatePreferenceInput!) {
		preference: updatePreference(preferenceId: $preferenceId, input: $input) {
			id
			colorScheme
			darkModeEnabled
			chatNameDisplay
		}
	}
`;

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

export const DELETE_CHANNEL_MUTATION = gql`
	mutation DeleteChannelMutation($channelId: ID!) {
		deleteChannel(channelId: $channelId)
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

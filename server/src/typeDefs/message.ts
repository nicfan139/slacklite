import { gql } from 'graphql-tag';

export const MessageTypeDefs = gql`
	type Query {
		messages: [Message!]
	}

	type Mutation {
		addMessage(input: AddMessageInput!): Message!
		updateMessage(messageId: ID!, text: String!): Message!
		deleteMessage(messageId: ID!): String!
	}

	type Message {
		id: ID!
		channel: Channel!
		from: User!
		text: String!
		createdAt: Float!
		updatedAt: Float!
	}

	input AddMessageInput {
		channelId: ID!
		senderId: ID!
		text: String!
	}
`;

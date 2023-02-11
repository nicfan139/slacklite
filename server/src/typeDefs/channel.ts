import { gql } from 'graphql-tag';

export const ChannelTypeDefs = gql`
	type Query {
		channels: [Channel]
		channel(channelId: ID!): Channel!
	}

	type Mutation {
		addChannel(input: ChannelInput!): Channel!
		updateChannel(channelId: ID!, input: ChannelInput!): Channel!
		deleteChannel(channelId: ID!): String!
	}

	type Subscription {
		channelAdded: Channel
	}

	type Channel {
		id: ID!
		name: String!
		description: String
		members: [User!]
	}

	input ChannelInput {
		name: String!
		description: String
		members: [String!]!
	}
`;

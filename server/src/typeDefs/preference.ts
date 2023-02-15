import { gql } from 'graphql-tag';

export const PreferenceTypeDefs = gql`
	type Query {
		preferences: [Preference!]
		preference(preferenceId: ID!): Preference!
	}

	type Mutation {
		updatePreference(preferenceId: ID!, input: UpdatePreferenceInput!): Preference!
	}

	type Preference {
		id: ID!
		colorScheme: String!
		darkModeEnabled: Boolean!
		chatNameDisplay: String!
		user: User!
		createdAt: Float!
		updatedAt: Float!
	}

	input UpdatePreferenceInput {
		colorScheme: String!
		darkModeEnabled: Boolean!
		chatNameDisplay: String!
	}
`;

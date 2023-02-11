import { gql } from 'graphql-tag';

export const UserTypeDefs = gql`
	type Query {
		users: [User!]
	}

	type Mutation {
		addUser(input: UserInput!): User!
		deleteUser(userId: ID!): String!
	}

	type User {
		id: ID!
		firstName: String!
		lastName: String!
		email: String!
		password: String!
		isAdmin: Boolean!
	}

	input UserInput {
		firstName: String!
		lastName: String!
		email: String!
		password: String!
		isAdmin: Boolean!
	}
`;

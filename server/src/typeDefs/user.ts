import { gql } from 'graphql-tag';

export const UserTypeDefs = gql`
	type Query {
		users: [User!]
	}

	type Mutation {
		addUser(input: AddUserInput!): User!
		updateUser(userId: ID!, input: UpdateUserInput!): User!
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

	input AddUserInput {
		firstName: String!
		lastName: String!
		email: String!
		password: String!
		isAdmin: Boolean!
	}

	input UpdateUserInput {
		firstName: String!
		lastName: String!
		email: String!
		isAdmin: Boolean!
	}
`;
import { ApolloClient, InMemoryCache } from '@apollo/client';

console.log('BACKEND_API_URL: ', process.env.BACKEND_API_URL);

export const apolloClient = new ApolloClient({
	uri: process.env.BACKEND_API_URL,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'network-only'
		}
	}
});

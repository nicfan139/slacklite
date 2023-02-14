import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BACKEND_API_URL } from '@/helpers';

export const apolloClient = new ApolloClient({
	uri: `${BACKEND_API_URL}/api/graphql`,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'network-only'
		}
	}
});

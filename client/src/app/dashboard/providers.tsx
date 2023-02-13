import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/graphql/client';

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }): React.ReactElement => (
	<QueryClientProvider client={queryClient}>
		<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
	</QueryClientProvider>
);

export default Providers;

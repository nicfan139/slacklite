import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/graphql/client';

const DashboardProviders = ({ children }: { children: React.ReactNode }): React.ReactElement => (
	<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);

export default DashboardProviders;

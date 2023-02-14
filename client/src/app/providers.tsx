import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationContextProvider, UserContextProvider } from '@/contexts';

const queryClient = new QueryClient();

const LayoutProviders = ({ children }: { children: React.ReactNode }): React.ReactElement => (
	<QueryClientProvider client={queryClient}>
		<NotificationContextProvider>
			<UserContextProvider>{children}</UserContextProvider>
		</NotificationContextProvider>
	</QueryClientProvider>
);

export default LayoutProviders;

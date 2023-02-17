import { QueryClient, QueryClientProvider } from 'react-query';
import {
	NotificationContextProvider,
	ResponsiveDisplayContextProvider,
	UserContextProvider
} from '@/contexts';

const queryClient = new QueryClient();

const LayoutProviders = ({ children }: { children: React.ReactNode }): React.ReactElement => (
	<QueryClientProvider client={queryClient}>
		<ResponsiveDisplayContextProvider>
			<NotificationContextProvider>
				<UserContextProvider>{children}</UserContextProvider>
			</NotificationContextProvider>
		</ResponsiveDisplayContextProvider>
	</QueryClientProvider>
);

export default LayoutProviders;

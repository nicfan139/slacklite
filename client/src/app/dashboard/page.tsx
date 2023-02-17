'use client';
import { useEffect } from 'react';
import { LoadingScreen } from '@/components';
import { useUserContext } from '@/contexts';
import { useUserQuery } from '@/graphql';
import ChatDashboard from './ChatDashboard';

export default function DashboardPage(): React.ReactElement {
	const { currentUser, setCurrentUser } = useUserContext();
	const { isLoading: isLoadingUser, user } = useUserQuery(currentUser?.id);

	useEffect(() => {
		if (user) {
			setCurrentUser(user);
		}
	}, [user]);

	if (isLoadingUser || !user || !currentUser?.channels)
		return <LoadingScreen message="Fetching channels" />;

	return (
		<section>{currentUser.channels && <ChatDashboard channels={currentUser.channels} />}</section>
	);
}

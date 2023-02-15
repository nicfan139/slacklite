'use client';
import { useState, useEffect } from 'react';
import { Loading, Button } from '@/components';
import { useUserContext } from '@/contexts';
import { useUserQuery } from '@/graphql';
import AddChannel from './AddChannel';
import ChatDashboard from './ChatDashboard';

export default function DashboardPage(): React.ReactElement {
	const { currentUser, setCurrentUser } = useUserContext();
	const { isLoading: isLoadingUser, user } = useUserQuery(currentUser?.id);

	const [showAddChannel, toggleAddChannel] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			setCurrentUser(user);
		}
	}, [user]);

	if (isLoadingUser || !user || !currentUser?.channels) return <Loading />;

	return (
		<div className="p-0">
			<AddChannel isOpen={showAddChannel} toggleAddChannel={toggleAddChannel} />

			<div className="flex mb-4">
				<h2 className="text-4xl mr-4 text-slate-800 font-bold">Channels</h2>

				<Button type="button" color="toggle" onClick={() => toggleAddChannel(true)}>
					Add
				</Button>
			</div>

			<ChatDashboard channels={currentUser.channels} />
		</div>
	);
}

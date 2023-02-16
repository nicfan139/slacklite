'use client';
import { useState, useEffect } from 'react';
import { LoadingScreen, Title, Button } from '@/components';
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

	if (isLoadingUser || !user || !currentUser?.channels)
		return <LoadingScreen message="Fetching channels" />;

	return (
		<div className="p-0">
			<AddChannel isOpen={showAddChannel} toggleAddChannel={toggleAddChannel} />

			<div className="flex mb-4">
				<Title className="mr-4">
					<h2>Channels</h2>
				</Title>

				<Button type="button" color="toggle" onClick={() => toggleAddChannel(true)}>
					Add
				</Button>
			</div>

			<section className="hidden md:block">
				{currentUser.channels.length > 0 ? (
					<ChatDashboard channels={currentUser.channels} />
				) : (
					<p className="my-6 text-xl text-slate-800 dark:text-white">
						Welcome to Slacklite! Add a new channel to get started :)
					</p>
				)}
			</section>

			<section className="block md:hidden">
				The chat dashboard has not been optimized for mobile yet :/
			</section>
		</div>
	);
}

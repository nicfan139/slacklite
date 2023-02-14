'use client';
import { Loading } from '@/components';
import { useUserContext } from '@/contexts';
import ChatDashboard from './ChatDashboard';

export default function DashboardPage(): React.ReactElement {
	const { currentUser } = useUserContext();

	if (!currentUser) return <Loading />;

	return (
		<div className="p-0">
			<h2 className="mb-4 text-4xl text-slate-800 font-bold">Channels</h2>

			<ChatDashboard channels={currentUser.channels} />
		</div>
	);
}

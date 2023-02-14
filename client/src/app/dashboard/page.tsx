'use client';
import { Box } from '@/components';
import { useUserContext } from '@/contexts';

export default function DashboardPage(): React.ReactElement {
	const { currentUser } = useUserContext();
	return (
		<Box>
			<h2 className="text-xl font-bold">Channels</h2>

			<ul>
				{currentUser?.channels.map((c) => (
					<li>
						{c.name}
						{c.description && ` - ${c.description}`}
					</li>
				))}
			</ul>
		</Box>
	);
}

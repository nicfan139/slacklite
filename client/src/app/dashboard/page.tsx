'use client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ChatBubbleLeftIcon from '@heroicons/react/24/solid/ChatBubbleLeftIcon'
import { useUserContext } from '@/contexts';
import { TUserChannel } from '@/types';
import ChannelMessages from './ChannelMessages';

export default function DashboardPage(): React.ReactElement {
	const { currentUser } = useUserContext();

	const [selectedChannel, setSelectedChannel] = useState<TUserChannel>();

	return (
		<div className="p-0">
			<h2 className="mb-4 text-4xl font-bold">Channels</h2>

			<div className="h-128 flex shadow-3xl">
				{/* Channel list */}
				<div className='h-full overflow-y-auto w-96 bg-red-800'>
					{currentUser?.channels.map((c) => {
						const IS_SELECTED = c.id === selectedChannel?.id;

						const twClass = twMerge(
							'flex mx-3 my-2 pl-4 pr-2 py-3 rounded-lg text-white hover:text-red-800 hover:bg-white hover:cursor-pointer transition-all',
							IS_SELECTED && 'text-red-800 bg-white font-semibold'
						);
						return (
							<div
								onClick={() => setSelectedChannel(c)}
								className={twClass}
							>
								<div className="h-6 w-6 items-center mr-3">
									{IS_SELECTED && <ChatBubbleLeftIcon />}
								</div>
								<label>{c.name}</label>
							</div>
					)})}
				</div>

				{/* Chat list */}
				<ChannelMessages selectedChannelId={selectedChannel?.id} />
			</div>
		</div>
	);
}

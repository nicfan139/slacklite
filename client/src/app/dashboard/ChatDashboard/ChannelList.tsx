import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import PlusCircleIcon from '@heroicons/react/24/solid/PlusCircleIcon';
import ChatBubbleLeftIcon from '@heroicons/react/24/solid/ChatBubbleLeftIcon';
import { TUserChannel } from '@/types';
import AddChannel from './AddChannel';

interface IChannelListProps {
	channels: Array<TUserChannel>;
	selectedChannel?: TUserChannel;
	setSelectedChannel: (channel: TUserChannel) => void;
}

const ChannelList = ({
	channels,
	selectedChannel,
	setSelectedChannel
}: IChannelListProps): React.ReactElement => {
	const [showAddChannel, toggleAddChannel] = useState<boolean>(false);
	return (
		<div className="h-full w-96 rounded-tl-lg rounded-bl-lg bg-red-800 dark:bg-slate-700">
			<AddChannel isOpen={showAddChannel} toggleAddChannel={toggleAddChannel} />

			<button
				type="button"
				onClick={() => toggleAddChannel(true)}
				className="w-full flex items-center px-7 py-2 border-b-2 rounded-tl-lg border-b-white hover:bg-red-500 dark:hover:bg-slate-500 text-white text-lg font-semibold transition-all"
			>
				<PlusCircleIcon className="h-7 w-7 mr-2" />
				Add new channel
			</button>

			<div className="h-[528px] overflow-x-hidden overflow-y-auto">
				{channels.map((c) => {
					const IS_SELECTED = c.id === selectedChannel?.id;
					return (
						<button
							key={`channel-${c.id}`}
							onClick={() => setSelectedChannel(c)}
							className={twMerge(
								'w-full flex mx-3 my-2 pl-4 pr-2 py-3 rounded-lg text-white hover:text-red-800 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all',
								IS_SELECTED &&
									'text-red-800 dark:text-white bg-white dark:bg-slate-900 font-semibold'
							)}
						>
							<div className="h-6 w-6 items-center mr-3">
								{IS_SELECTED && <ChatBubbleLeftIcon />}
							</div>
							<label>{c.name}</label>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ChannelList;

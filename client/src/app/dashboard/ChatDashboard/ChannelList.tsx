import { twMerge } from 'tailwind-merge';
import ChatBubbleLeftIcon from '@heroicons/react/24/solid/ChatBubbleLeftIcon';
import { TUserChannel } from '@/types';

interface IChannelListProps {
	channels: Array<TUserChannel>;
	selectedChannel?: TUserChannel;
	setSelectedChannel: (channel: TUserChannel) => void;
}

const ChannelList = ({
	channels,
	selectedChannel,
	setSelectedChannel
}: IChannelListProps): React.ReactElement => (
	<div className="h-full overflow-x-hidden overflow-y-auto w-96 rounded-tl-lg rounded-bl-lg bg-red-800 dark:bg-slate-700">
		{channels.map((c) => {
			const IS_SELECTED = c.id === selectedChannel?.id;
			return (
				<button
					key={`channel-${c.id}`}
					onClick={() => setSelectedChannel(c)}
					className={twMerge(
						'w-full flex mx-3 my-2 pl-4 pr-2 py-3 rounded-lg text-white hover:text-red-800 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all',
						IS_SELECTED && 'text-red-800 dark:text-white bg-white dark:bg-slate-900 font-semibold'
					)}
				>
					<div className="h-6 w-6 items-center mr-3">{IS_SELECTED && <ChatBubbleLeftIcon />}</div>
					<label>{c.name}</label>
				</button>
			);
		})}
	</div>
);

export default ChannelList;

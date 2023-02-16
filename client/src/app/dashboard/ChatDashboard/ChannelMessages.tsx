import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import ArrowSmallLeftIcon from '@heroicons/react/24/outline/ArrowSmallLeftIcon';
import { Loading } from '@/components';
import { useUserContext } from '@/contexts';
import { useChannelQuery } from '@/graphql';
import { TUserChannel } from '@/types';
import ChatInput from './ChatInput';
import DeleteChannel from './DeleteChannel';

interface IChannelMessagesProps {
	selectedChannelId?: string;
	setSelectedChannel: (channel?: TUserChannel) => void;
}

const ChannelMessages = ({
	selectedChannelId,
	setSelectedChannel
}: IChannelMessagesProps): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { isLoading, channel } = useChannelQuery(selectedChannelId);

	const CHAT_NAME_PREFERENCE = currentUser?.preferences?.chatNameDisplay ?? 'fullName';

	const CURRENT_USER_OWNS_CHANNEL = channel?.owner?.id === currentUser?.id;

	return (
		<div className="w-full flex flex-col justify-center p-4 rounded-tr-lg rounded-br-lg bg-white dark:bg-slate-900">
			{selectedChannelId && channel ? (
				<>
					<div className="flex justify-between items-end mb-2">
						<div>
							<h3 className="text-2xl text-red-500 dark:text-white font-semibold">
								{channel.name}
							</h3>
							<p className="text-slate-900 dark:text-white italic">
								{channel.description ?? 'No description'}
							</p>
						</div>

						<div className="flex gap-4 items-end">
							<div className="flex flex-col items-end text-sm dark:text-white">
								<div className="flex">
									<label className="mr-1">Owned by</label>
									<p className="font-semibold">
										{CURRENT_USER_OWNS_CHANNEL
											? 'You'
											: `${channel.owner.firstName} ${channel.owner.lastName}`}
									</p>
								</div>
								<div className="flex items-center">
									<label className="mr-1">Created on</label>
									<p className="font-semibold">{dayjs(channel.createdAt).format('YYYY-MM-DD')}</p>
								</div>
							</div>

							{CURRENT_USER_OWNS_CHANNEL && (
								<DeleteChannel channel={channel} setSelectedChannel={setSelectedChannel} />
							)}
						</div>
					</div>

					<div className="h-4/6 overflow-x-hidden overflow-y-scroll flex flex-col mb-2 pb-4 border bg-slate-50 dark:bg-slate-600 dark:text-white">
						{channel.messages.length > 0 ? (
							channel.messages.map((message) => {
								const MESSAGE_OWNER = message.from;
								return (
									<div className="w-full flex justify-between py-2 px-4 hover:bg-slate-100 dark:hover:bg-slate-500">
										<div>
											<label className="text-slate-800 dark:text-white font-bold">
												{CHAT_NAME_PREFERENCE === 'fullName' &&
													`${MESSAGE_OWNER.firstName} ${MESSAGE_OWNER.lastName}`}
												{CHAT_NAME_PREFERENCE === 'firstName' && MESSAGE_OWNER.firstName}
												{CHAT_NAME_PREFERENCE === 'email' && MESSAGE_OWNER.email}:
											</label>
											<ReactMarkdown className="max-w-sm" children={message.text} />
										</div>

										<label>{dayjs(message.createdAt).format('YYYY-MM-DD hh:mm A')}</label>
									</div>
								);
							})
						) : (
							<label className="w-full m-4 text-center text-slate-800 dark:text-white">
								No messages to display. Feel free to start this conversation!
							</label>
						)}
					</div>

					<ChatInput channelId={selectedChannelId} />
				</>
			) : (
				<div className="flex justify-center items-center">
					{isLoading ? (
						<Loading className="h-20 w-20" />
					) : (
						<div className="h-full flex items-center m-4">
							<ArrowSmallLeftIcon className="h-6 w-6" />
							<label className="ml-2 dark:text-white">Select a channel to get started!</label>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ChannelMessages;

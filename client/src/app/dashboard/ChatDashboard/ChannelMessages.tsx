import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import ArrowSmallLeftIcon from '@heroicons/react/24/outline/ArrowSmallLeftIcon';
import { Loading } from '@/components';
import { useChannelQuery } from '@/graphql';
import ChatInput from './ChatInput';

interface IChannelMessagesProps {
	selectedChannelId?: string;
}

const ChannelMessages = ({ selectedChannelId }: IChannelMessagesProps): React.ReactElement => {
	const { isLoading, channel } = useChannelQuery(selectedChannelId);

	return (
		<div className="w-full flex flex-col justify-center p-4 rounded-tr-lg rounded-br-lg bg-white">
			<div className="h-4/6 overflow-y-scroll flex flex-col border bg-slate-50">
				{selectedChannelId && channel ? (
					<>
						{channel.messages.length > 0 ? (
							channel.messages.map((message) => (
								<div className="w-full flex justify-between py-2 px-4 hover:bg-slate-100">
									<div>
										<label className="font-bold">
											{message.from.firstName} {message.from.lastName}
										</label>
										<ReactMarkdown children={message.text} />
									</div>

									<label>{dayjs(message.createdAt).format('YYYY-MM-DD hh:mm A')}</label>
								</div>
							))
						) : (
							<label className="m-4 text-slate-800">
								No messages to display. Feel free to start this conversation!
							</label>
						)}
					</>
				) : (
					<div className="flex justify-center items-center">
						{isLoading ? (
							<Loading className="h-20 w-20" />
						) : (
							<div className="h-full flex items-center m-4">
								<ArrowSmallLeftIcon className="h-6 w-6" />
								<label className="ml-2">Select a channel to get started!</label>
							</div>
						)}
					</div>
				)}
			</div>

			<ChatInput channelId={selectedChannelId as string} />
		</div>
	);
};

export default ChannelMessages;

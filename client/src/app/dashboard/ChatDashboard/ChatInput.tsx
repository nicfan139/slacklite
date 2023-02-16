import { useState, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import PaperAirplaneIcon from '@heroicons/react/24/outline/PaperAirplaneIcon';
import { Button } from '@/components';
import { useUserContext } from '@/contexts';
import { useAddMessageMutation } from '@/graphql';

interface IChatInputProps {
	channelId: string;
}

const ChatInput = ({ channelId }: IChatInputProps): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { isLoading, addMessage } = useAddMessageMutation();

	const [message, setMessage] = useState<string>('');
	const [textboxView, setTextboxView] = useState<'write' | 'preview'>('write');

	const onSendMessage = async () => {
		const messageResponse = await addMessage({
			channelId,
			senderId: currentUser?.id as string,
			text: message
		});
		if (messageResponse) {
			setMessage('');
			setTextboxView('write');
		}
	};

	return (
		<div className="flex flex-col">
			{textboxView === 'write' && (
				<textarea
					rows={3}
					placeholder="Enter a message here. You can also write markdown **like this** or _this_"
					onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
					value={message}
					className="h-20 w-full resize-none p-2 border outline-none dark:bg-slate-500 dark:text-white"
				/>
			)}
			{textboxView === 'preview' && (
				<ReactMarkdown
					children={message}
					className="h-20 w-full overflow-y-auto p-2 border bg-slate-100 dark:bg-slate-600 dark:text-white"
				/>
			)}

			<div className="w-full flex justify-between">
				<div>
					<button
						type="button"
						onClick={() => setTextboxView('write')}
						className={`px-3 py-2 border dark:text-white rounded-lg ${
							textboxView === 'write' && 'bg-red-800 dark:bg-slate-600 text-white font-semibold'
						}`}
					>
						Write
					</button>
					<button
						type="button"
						onClick={() => message && setTextboxView('preview')}
						className={`px-3 py-2 border dark:text-white rounded-lg ${
							textboxView === 'preview' && 'bg-red-800 dark:bg-slate-600 text-white font-semibold'
						} ${!message && 'cursor-not-allowed'}`}
					>
						Preview
					</button>
				</div>

				<Button type="button" color="primary" isLoading={isLoading} onClick={onSendMessage} className="dark:border-white">
					<PaperAirplaneIcon className="h-5 w-5 mr-2" />
					Send
				</Button>
			</div>
		</div>
	);
};

export default ChatInput;

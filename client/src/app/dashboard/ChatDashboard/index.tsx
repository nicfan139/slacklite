import { useState } from 'react';
import { TUserChannel } from '@/types';
import ChannelList from './ChannelList';
import ChannelMessages from './ChannelMessages';

interface IChatDashboardProps {
	channels: Array<TUserChannel>;
}

const ChatDashboard = ({ channels }: IChatDashboardProps): React.ReactElement => {
	const [selectedChannel, setSelectedChannel] = useState<TUserChannel>();
	return (
		<div className="h-144 flex">
			<ChannelList {...{ channels, selectedChannel, setSelectedChannel }} />

			<ChannelMessages
				selectedChannelId={selectedChannel?.id}
				setSelectedChannel={setSelectedChannel}
				channels={channels}
			/>
		</div>
	);
};

export default ChatDashboard;

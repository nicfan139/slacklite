import { useState } from 'react';
import { Modal } from '@/components';
import { useResponsiveDisplay } from '@/contexts';
import { TUserChannel } from '@/types';
import ChannelList from './ChannelList';
import ChannelMessages from './ChannelMessages';

interface IChatDashboardProps {
	channels: Array<TUserChannel>;
}

const ChatDashboard = ({ channels }: IChatDashboardProps): React.ReactElement => {
	const [selectedChannel, setSelectedChannel] = useState<TUserChannel>();
	const { isMobile } = useResponsiveDisplay();

	return (
		<div className="h-144 flex justify-center">
			<ChannelList {...{ channels, selectedChannel, setSelectedChannel }} />

			{isMobile ? (
				<Modal isOpen={Boolean(selectedChannel)} className="w-full max-w-screen-sm p-0">
					<ChannelMessages
						selectedChannelId={selectedChannel?.id}
						setSelectedChannel={setSelectedChannel}
						channels={channels}
					/>
				</Modal>
			) : (
				<ChannelMessages
					selectedChannelId={selectedChannel?.id}
					setSelectedChannel={setSelectedChannel}
					channels={channels}
				/>
			)}
		</div>
	);
};

export default ChatDashboard;

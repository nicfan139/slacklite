import { useState } from 'react';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { Modal, Button } from '@/components';
import { useUserContext, useNotificationContext } from '@/contexts';
import { useDeleteChannelMutation } from '@/graphql';
import { TChannel, TUserChannel } from '@/types';

interface IDeleteChannelProps {
	channel: TChannel;
	setSelectedChannel: (channel?: TUserChannel) => void;
}

const DeleteChannel = ({
	channel,
	setSelectedChannel
}: IDeleteChannelProps): React.ReactElement => {
	const { currentUser } = useUserContext();
	const { showNotification } = useNotificationContext();
	const { isLoading, deleteChannel } = useDeleteChannelMutation();

	const [showConfirm, toggleConfirm] = useState<boolean>(false);

	const onDeleteConfirm = async () => {
		try {
			await deleteChannel({ channelId: channel.id, ownerId: currentUser?.id as string });
			showNotification({
				type: 'success',
				title: 'Channel successfully deleted'
			});
			setSelectedChannel(undefined);
		} catch (e) {
			const error = e as Error;
			console.log('Error: ', error.message);
			showNotification({
				type: 'error',
				title: error.message
			});
		}
	};

	return (
		<>
			<Modal
				isOpen={showConfirm}
				title={`You are about to delete channel "${channel.name}". Proceed?`}
			>
				<div className="flex gap-2 justify-center">
					<Button color="secondary" type="button" onClick={() => toggleConfirm(false)}>
						Cancel
					</Button>

					<Button color="primary" type="button" onClick={onDeleteConfirm} isLoading={isLoading}>
						<TrashIcon className="h-4 w-4 mr-2" />
						Delete
					</Button>
				</div>
			</Modal>

			<Button
				color="toggle"
				type="button"
				onClick={() => toggleConfirm(true)}
				className="border border-white"
			>
				<TrashIcon className="h-4 w-4 mr-2" />
				Delete
			</Button>
		</>
	);
};

export default DeleteChannel;

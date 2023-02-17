import { createContext, ReactNode, ReactElement, useState, useContext } from 'react';
import Notification from './Notification';

interface INotificationContext {
	showNotification: (options: IShowNotificationOptions) => void;
}

interface IShowNotificationOptions {
	type: 'success' | 'warning' | 'error';
	title: string;
	onClose?: () => void;
}

const NotificationContext = createContext<INotificationContext>({
	showNotification: () => {}
});

export const NotificationContextProvider = ({
	children
}: {
	children: ReactNode;
}): ReactElement => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [notification, toggleNotification] = useState<IShowNotificationOptions | null>(null);

	const showNotification = (options: IShowNotificationOptions) => {
		setIsOpen(true);
		toggleNotification(options);
	};

	const closeNotification = () => {
		if (notification?.onClose) {
			notification.onClose();
		}

		setIsOpen(false);
		setTimeout(() => {
			toggleNotification(null);
		}, 300);
	};

	return (
		<NotificationContext.Provider
			value={{
				showNotification
			}}
		>
			<Notification
				isOpen={isOpen}
				type={notification?.type as 'success' | 'warning' | 'error'}
				title={notification?.title as string}
				onClose={closeNotification}
			/>

			{children}
		</NotificationContext.Provider>
	);
};

export const useNotificationContext = () => useContext(NotificationContext);

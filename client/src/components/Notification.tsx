import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';
import Button from './Button';

interface INotificationProps {
	type: 'success' | 'warning' | 'error';
	isOpen: boolean;
	onClose: () => void;
	title: string;
}

const Notification = ({ type, isOpen, onClose, title }: INotificationProps): React.ReactElement => (
	<Transition appear show={isOpen} as={Fragment}>
		<Dialog as="div" className="relative z-10" onClose={onClose}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-60" />
			</Transition.Child>

			<div className="fixed inset-0 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<Dialog.Panel className="w-full max-w-md transform overflow-hidden flex flex-col items-center rounded-2xl bg-white dark:bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
							<div className="mb-2">
								{type === 'success' && (
									<CheckCircleIcon className="h-16 w-16 text-green-500 dark:text-white" />
								)}
								{type === 'warning' && (
									<ExclamationTriangleIcon className="h-16 w-16 text-orange-500 dark:text-white" />
								)}
								{type === 'error' && (
									<div>
										<ExclamationCircleIcon className="h-16 w-16 text-red-500 dark:text-white" />
									</div>
								)}
							</div>

							<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-slate-800 dark:text-white">
								{title}
							</Dialog.Title>

							<div className="mt-4">
								<Button color="primary" type="button" onClick={onClose}>
									Ok
								</Button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition>
);

export default Notification;

import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import ExclamationCircleIcon from '@heroicons/react/24/outline/ExclamationCircleIcon';

interface INotificationProps {
	type: 'warning' | 'error';
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
				<div className="fixed inset-0 bg-black bg-opacity-25" />
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
							{type === 'warning' && (
								<div>
									<ExclamationTriangleIcon className="h-16 w-16 text-orange-500 dark:text-white" />
								</div>
							)}

							{type === 'error' && (
								<div>
									<ExclamationCircleIcon className="h-16 w-16 text-red-500 dark:text-white" />
								</div>
							)}

							<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
								{title}
							</Dialog.Title>

							<div className="mt-4">
								<button
									type="button"
									className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									onClick={onClose}
								>
									Ok, I understand
								</button>
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition>
);

export default Notification;

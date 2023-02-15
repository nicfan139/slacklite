import { ReactNode, ReactElement, Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

interface IModalProps {
	isOpen: boolean;
	title: string | ReactNode;
	children: ReactNode;
}

const Modal = ({ isOpen, title, children }: IModalProps): ReactElement => (
	<Transition appear show={isOpen} as={Fragment}>
		<Dialog as="div" className="relative z-10" onClose={() => {}}>
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
						<Dialog.Panel className="w-full max-w-md transform flex flex-col items-center rounded-2xl bg-white dark:bg-slate-700 p-6 text-left align-middle shadow-xl transition-all">
							<Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-900">
								{title}
							</Dialog.Title>

							<div className="w-full mt-4">{children}</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition>
);

export default Modal;

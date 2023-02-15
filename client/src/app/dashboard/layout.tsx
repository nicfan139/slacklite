'use client';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts';
import { Menu, Transition } from '@headlessui/react';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import ChatBubbleLeftIcon from '@heroicons/react/24/outline/ChatBubbleLeftIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import DashboardProviders from './providers';
import { Title } from '@/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { currentUser } = useUserContext();

	const handleLogout = () => {
		localStorage.removeItem('slacklite-userAccessToken');
		window.location.href = '/login';
	};

	return (
		<DashboardProviders>
			<div className="h-screen w-screen relative flex flex-col justify-start items-center bg-red-400">
				<nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-2 bg-red-700 shadow-xl">
					<div
						onClick={() => router.push('/dashboard')}
						className="flex items-center text-white cursor-pointer"
					>
						<ChatBubbleLeftRightIcon className="h-10 w-10 mr-2" />

						<Title className="text-3xl text-white">
							<h1>Slacklite</h1>
						</Title>
					</div>

					<div className="flex items-center">
						<div className="hidden md:block mr-8 text-white">
							<label className="mr-2">Logged in as:</label>
							<label className="font-semibold">{currentUser?.email}</label>
						</div>

						<Menu as="div" className="relative inline-block text-left">
							<div>
								<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-semibold text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
									Menu
									<ChevronDownIcon
										className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
										aria-hidden="true"
									/>
								</Menu.Button>
							</div>
							<Transition
								as={Fragment}
								enter="transition ease-out duration-100"
								enterFrom="transform opacity-0 scale-95"
								enterTo="transform opacity-100 scale-100"
								leave="transition ease-in duration-75"
								leaveFrom="transform opacity-100 scale-100"
								leaveTo="transform opacity-0 scale-95"
							>
								<Menu.Items className="absolute right-0 mt-2 py-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div>
										<Menu.Item>
											<button
												onClick={() => router.push('/dashboard')}
												className="w-full flex items-center p-2 hover:text-white hover:bg-red-500"
											>
												<ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
												Chat
											</button>
										</Menu.Item>

										<Menu.Item>
											<button
												onClick={() => router.push('/dashboard/profile')}
												className="w-full flex items-center p-2 hover:text-white hover:bg-red-500"
											>
												<UserIcon className="h-5 w-5 mr-2" />
												Profile
											</button>
										</Menu.Item>
									</div>
									<div>
										<Menu.Item>
											<button
												onClick={handleLogout}
												className="w-full flex items-center p-2 hover:text-white hover:bg-red-500"
											>
												<ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
												Logout
											</button>
										</Menu.Item>
									</div>
								</Menu.Items>
							</Transition>
						</Menu>
					</div>
				</nav>

				<main className="w-full max-w-4xl mt-24 mx-auto">{children}</main>
			</div>
		</DashboardProviders>
	);
}

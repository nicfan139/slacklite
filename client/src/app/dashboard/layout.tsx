'use client';
import { useUserContext } from '@/contexts';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/outline/ChatBubbleLeftRightIcon';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import DashboardProviders from './providers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { currentUser } = useUserContext();

	const handleLogout = () => {
		localStorage.removeItem('slacklite-userAccessToken');
		window.location.href = '/login';
	};

	return (
		<DashboardProviders>
			<div className="h-screen w-screen relative flex flex-col justify-start items-center bg-red-400">
				<nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-2 bg-red-700 shadow-xl">
					<div className="flex items-center text-white">
						<ChatBubbleLeftRightIcon className="h-10 w-10 mr-2" />

						<h1 className="text-2xl font-bold">Slacklite</h1>
					</div>

					<div className="flex items-center">
						<div className="mr-8 text-white">
							<label className="mr-2">Logged in as:</label>
							<label className="font-semibold">{currentUser?.email}</label>
						</div>

						<a
							onClick={handleLogout}
							className="flex items-center py-3 text-white border-b-2 border-red-700 hover:border-white transition-all"
						>
							<ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
							LOGOUT
						</a>
					</div>
				</nav>

				<main className="w-full max-w-4xl mt-24 mx-auto">{children}</main>
			</div>
		</DashboardProviders>
	);
}

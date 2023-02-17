'use client';
import { useEffect } from 'react';
import { useUserContext } from '@/contexts';
import DashboardProviders from './providers';
import Navbar from './Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { currentUser } = useUserContext();

	useEffect(() => {
		if (currentUser?.preferences) {
			const body = document.querySelector('body');
			if (currentUser.preferences.darkModeEnabled) {
				body?.classList.add('dark');
			} else {
				body?.classList.remove('dark');
			}
		}
	}, [currentUser]);

	return (
		<DashboardProviders>
			<div className="h-screen w-screen relative flex flex-col justify-center items-center bg-red-400 dark:bg-slate-600">
				{currentUser?.email && <Navbar />}

				<main className="w-full max-w-4xl overflow-y-scroll md:overflow-y-hidden pt-20 pb-16 mb:pb-0 mx-auto">
					{children}
				</main>
			</div>
		</DashboardProviders>
	);
}

'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components';
import { useUserContext } from '@/contexts';

export default function Home() {
	const router = useRouter();
	const { currentUser } = useUserContext();

	useEffect(() => {
		router.push(currentUser ? '/dashboard' : '/login');
	}, [currentUser]);

	return (
		<div className="h-screen w-screen flex flex-col justify-center items-center">
			<Loading className="h-20 w-20" />
			<p className="mt-2 text-xl">Redirecting</p>
		</div>
	);
}
